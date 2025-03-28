import axios from "axios"
import Instrument from "../models/Instrument"
import { ActivosType, EnumTypeOperation, EnumTypeOrder, InstrumentType, TypeBody } from "../types/types"
import ActivosPortfolio from "../models/ActivosPortfolio"

const API_URL = "https://dummy-api-topaz.vercel.app"

const getInstruments = async () => {
    const url = `${API_URL}/instruments`
    const response = await axios.get(url)
    const dataInstruments = response.data.map( (item: InstrumentType) => new Instrument(item))
    return dataInstruments
}

const getSearchInstruments = async (activo:string) => {
    const url = `${API_URL}/search?query=${activo.toUpperCase()}`
    const response = await axios.get(url)
    return response.data
}

const getPortfolio = async () => {
    const url = `${API_URL}/portfolio`
    const response = await axios.get(url)
    const dataInstruments = response.data.map( (item: ActivosType) => new ActivosPortfolio(item))
    return dataInstruments
}

const postOrder = async (body: TypeBody) => {
    const url = `${API_URL}/orders`
    const response = await axios.post(url, body)
    return response.data
}

export default {
    getInstruments,
    getPortfolio,
    postOrder,
    getSearchInstruments
}