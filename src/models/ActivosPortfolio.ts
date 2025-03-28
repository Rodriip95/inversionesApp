import { ActivosType } from "../types/types";
import { calculatePortfolio, calculateReturn } from "../utlis/Formats";

export default class ActivosPortfolio {
    instrument_id: number;
    ticker: string;
    quantity: number;
    avg_cost_price: number;
    last_price: number;
    close_price: number;
    return: number;
    balance: {
        valorMercado: number,
        gananciaActivo: number,
        porcentajeRendimientoTotal: number,
    }

    constructor(data:ActivosType) {
        this.instrument_id = data.instrument_id 
        this.ticker = data.ticker 
        this.quantity = data.quantity 
        this.avg_cost_price = data.avg_cost_price 
        this.last_price = data.last_price 
        this.close_price = data.close_price
        this.balance = calculatePortfolio(data)
        this.return = calculateReturn(data.last_price, data.close_price) 
    }
}