import { Product } from './product';

export interface Store {
    name: string;
    phoneNumber: string;
    address: string;
    productsList?: Product[];
}