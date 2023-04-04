import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
} from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../config/api";
import {useNavigate } from 'react-router-dom';
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles((theme) => ({
  row: {
    height: "100px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#16171a",
    cursor: "pointer",
    justifyContent: "center",
    borderBottom: "1px solid white",
    "&:hover": {
      backgroundColor: "#131111",
      borderBottom: "1px solid gold",
    },
    fontFamily: "Montserrat",
  },

  pagination: {
    "& .MuiPaginationItem-root": {
    color: "gold",
    },
  },

  img: {
    pointerEvents: "none"
  },

  informacoes: {
    display: "flex",
    flexDirection: "column",
  },

  span: {
    textTransform: "Uppercase",
    fontSize: 22,
  },

}));

const CoinsTable = () => {
  const classes = useStyles();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const {currency} = CryptoState();

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
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    ));
  };


  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                // .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}>
                      <tableCell
                      component="th"
                      scope="row"
                      style={{
                        display: "flex",
                        gap: 15,
                      }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          className={classes.img}
                        />
                        <div className={row?.informacoes}>
                          <span className={row.span}>
                            {row.symbol}
                          </span>
                          
                        </div>
                      </tableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
          </TableContainer>
      </Container>
    </ThemeProvider>
  )
};

export default CoinsTable;