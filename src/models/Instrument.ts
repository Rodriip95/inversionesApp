import { InstrumentType } from "../types/types";
import { calculateReturn } from "../utlis/Formats";

export default class Instrument {
    id: number;
    ticker: string;
    name: string;
    type: string;
    last_price: number;
    close_price: number;
    return: number;

    constructor(data:InstrumentType) {
        this.id = data.id 
        this.ticker = data.ticker 
        this.name = data.name 
        this.type = data.type 
        this.last_price = data.last_price 
        this.close_price = data.close_price
        this.return = calculateReturn(data.last_price, data.close_price) 
    }
}