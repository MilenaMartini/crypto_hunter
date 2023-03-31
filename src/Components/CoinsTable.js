import axios from "axios"
import React from 'react';
import { useState } from "react";
import {CoinList} from '../config/api';
import {CryptoState} from "../CryptoContext";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core"

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const {currency} = CryptoState()

    const fetchCoins = async () => {
      setLoading(true);
        const { data } = await axios.get(CoinList(currency));

      setCoins(data);
      setLoading(false);
    };

    useEffect (() => {
      fetchCoins();
      }, [currency]);

      const darkTheme = createTheme({
        palette: {
          primary:{
          main: "#fff",
        },
   
      },
      })

  return (
    <ThemeProvider theme={darkTheme}>

    </ThemeProvider>
  )
};

export default CoinsTable;