import {type Price0X} from "@/src/core/ApiServices/Swap/Ox";

export type Price = Price0X & {

};


export default class PriceFormatter {

    public static formatFrom0X(price: Price0X): Price {
        const priceFormatted: Price = price;

        return priceFormatted;
    }
}