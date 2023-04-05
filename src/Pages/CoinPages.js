import axios from "axios";
import React  from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { makeStyles } from '@material-ui/core/styles';
import { CryptoState } from "../CryptoContext";
import CoinInfo from "../Components/CoinInfo";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    widht: "30%",
    [theme.breakpoints.down("md")]: {
      widht: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  }
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };


  useEffect(() => {
     fetchCoin();
  }, []);



  const classes = useStyles();

  return (
     <div className={classes.container}>
      <div className={classes.sidebar}>
      <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
      </div>

      {/* chart */}
     {/*  <CoinInfo={coin} /> */}
    </div>
  );
};
export default CoinPage;
