import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import ApiServices from '../services/ApiServices';
import { ActivosObjType } from '../types/types';
import { calculatePortfolioTotal } from '../utlis/Formats';

export interface iBalance {
  balanceTotal: number;
  porcentajeBalanceTotal: number;
  balanceTotalGanancias: number;
}

const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState<ActivosObjType[] | undefined>()
  const [balances, setBalances] = useState<iBalance>()
  const [loading, setloading] = useState(false)

  useEffect(() => {
      getPortfolio();
    }, []);

      const getPortfolio = async () => {
        setloading(true)
        try {
          const data = await ApiServices.getPortfolio();
          setPortfolio(data);
          setBalances(calculatePortfolioTotal(data))
        } catch (error) {
          setPortfolio(undefined);
        } finally {
          setloading(false)
        }
      };

  return {
    portfolio,
    balances,
    loading
  }
}

export default usePortfolio;