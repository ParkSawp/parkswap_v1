import {Quote0X} from "@/src/core/ApiServices/Swap/Ox";

export type Quote = Quote0X & {

};

export default class QuoteFormatter {

    public static formatFrom0X(quote: Quote0X): Quote {
        return quote;
    }
}