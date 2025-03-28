export type InstrumentType = {
    id: number,
    ticker: string,
    name: string,
    type: string,
    last_price: number,
    close_price: number,
}

export type InstrumentObjType = {
    id: number,
    ticker: string,
    name: string,
    type: string,
    last_price: number,
    close_price: number,
    return: number,
}

export type ActivosType = {
    instrument_id: number,
    ticker: string,
    quantity: number,
    avg_cost_price: number,
    last_price: number,
    close_price: number,
}

export type ActivosObjType = {
    instrument_id: number,
    ticker: string,
    quantity: number,
    avg_cost_price: number,
    last_price: number,
    close_price: number,
    return: number,
    balance: {
        valorMercado: number,
        gananciaActivo: number,
        porcentajeRendimientoTotal: number,
    }
}

export type TypeBody = {
    instrument_id: number,
    side: EnumTypeOrder,
    type: EnumTypeOperation,
    quantity: number,
    price?: number,
}

export type TypeResponseOrder = {
    instrument_id: number,
    side: EnumTypeOrder,
    type: EnumTypeOperation,
    quantity: number,
    id: number,
    price: number,
    status: EnumTypeStatus,
}

export enum EnumTypeStatus {
    REJECTED = 'REJECTED',
    PENDING = 'PENDING',
    FILLED= "FILLED",
}

export enum EnumTypeOperation {
    MARKET = 'MARKET',
    LIMIT = 'LIMIT',
}

export enum EnumTypeOrder {
    BUY = 'BUY',
    SELL = 'SELL',
}