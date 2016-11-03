import { Component, OnInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IProduct } from './product';
import { ProductService } from './product.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
    templateUrl: './app/products/product-edit.component.html'
})
export class ProductEditComponent implements OnInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formControls: ElementRef[];

    pageTitle: string = 'Product Edit';
    product: IProduct;
    errorMessage: string;
    private sub: Subscription;

    productForm: FormGroup;
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    genericValidator: GenericValidator;
    tags: FormArray;

    constructor(private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _productService: ProductService) {

        this.validationMessages = {
            productName: {
                required: 'Product name is required',
                minlength: 'Product name must be at least three characters.',
                maxlength: 'Product name cannot exceed 50 characters.'
            },
            productCode: {
                required: 'Product code is required'
            },
            starRating: {
                range: 'Rate the product between 1 (lowest) and 5 (highest).'
            }
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getProduct(id: number) {
        this._productService.getProduct(id)
            .subscribe(
            (product: IProduct) => this.onProductRetrieved(product),
            (error: any) => this.errorMessage = <any>error);
    }

    onProductRetrieved(product: IProduct) {
        if (this.productForm) {
            this.productForm.reset();
        }
        this.product = product;

        if (this.product.productId === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }

        this.productForm = this.fb.group({
            productName: [this.product.productName,
            [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]],
            productCode: [this.product.productCode, Validators.required],
            starRating: [this.product.starRating,
            NumberValidators.range(1, 5)],
            tagArray: this.buildTagArray(),
            description: this.product.description
        });

        // wait a tick
        setTimeout(() => {
            let controlBlurs: Observable<any>[] = this.formControls
                .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

            Observable.merge(this.productForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
                this.displayMessage = this.genericValidator.processMessages(this.productForm);
            });
        });
    }

    addTag(defaultValue: string): void {
        this.tags.push(this.buildTag(defaultValue));
    }

    buildTagArray(): FormArray {
        this.tags = new FormArray([]);
        for (let t in this.product.tags) {
            if (this.product.tags.hasOwnProperty(t)) {
                this.addTag(this.product.tags[t]);
            }
        }
        return this.tags;
    }

    buildTag(defaultValue: string): FormControl {
        return new FormControl(defaultValue);
    }

    saveProduct() {
        if (this.productForm.dirty && this.productForm.valid) {
            this.product = this.productForm.value;
            alert(`Movie: ${JSON.stringify(this.productForm.value)}`);
        }
    }
}
