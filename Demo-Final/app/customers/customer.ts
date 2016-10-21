export class Customer {

    constructor(public firstName: string = '',
        public lastName: string = '',
        public email: string = '',
        public sendCatalog: boolean = false,
        public addressType: string = 'home',
        public street1?: string,
        public street2?: string,
        public city?: string,
        public state: string = '',
        public zip?: string) { }
}
