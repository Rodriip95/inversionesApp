type Activo = {
  last_price: number;
  close_price: number;
  avg_cost_price: number;
  quantity: number;
};

export const calculateReturn = (
  last_price: number,
  price_to_compare: number
): number => {
  const calculate = ((last_price - price_to_compare) / price_to_compare) * 100;
  //return parseFloat(calculate.toFixed(2));
  return dosDecimales(calculate)
};

export const calculatePortfolio = (activo: Activo) => {
  const { last_price, avg_cost_price, quantity } = activo;
  const valorMercado = last_price * quantity;
  const gananciaActivo = (last_price - avg_cost_price) * quantity;
  const porcentajeRendimientoTotal =
    ((last_price - avg_cost_price) / avg_cost_price) * 100;
  return {
    valorMercado: dosDecimales(valorMercado),
    gananciaActivo: dosDecimales(gananciaActivo),
    porcentajeRendimientoTotal: dosDecimales(porcentajeRendimientoTotal), 
  };
};

export const calculatePortfolioTotal = (activos: Activo[]) => {
    let balanceTotal = 0;
    let porcentajeBalanceTotal = 0;
    let balanceTotalGanancias = 0;

    activos.forEach( activo => {
        const {valorMercado, gananciaActivo, porcentajeRendimientoTotal} = calculatePortfolio(activo)
        balanceTotal += valorMercado
        porcentajeBalanceTotal += porcentajeRendimientoTotal
        balanceTotalGanancias += gananciaActivo
    })

    return {
        balanceTotal: dosDecimales(balanceTotal),
        porcentajeBalanceTotal: dosDecimales(porcentajeBalanceTotal / activos.length),
        balanceTotalGanancias: dosDecimales(balanceTotalGanancias)
    };
  };

  const dosDecimales = (data:number) => {
    return parseFloat(data.toFixed(2))
  }

  export const formatPrice = (value:any, locale = "en-US", currency = "USD") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };