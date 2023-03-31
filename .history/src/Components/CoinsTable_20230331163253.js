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
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../config/api";
import { useHistory } from 'react-router-dom';

import { CryptoState } from "../CryptoContext";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] =useState ()
    const history = useHistory();

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
        type: "dark"
      },
      });

      const handleSearch = () => {
        return coins.filter((coin) => (
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
        ))
      }

      const useStyles = makeStyles(() => ({

      }))

      const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat"}}>
            Cryptocurrecy Prices by Market Cap
          </Typography>

          <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%"}}
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
                {handleSearch().map(row=>{
                  const profit = row.price_change_percentage_24h > 0;

                  return(
                    <TableRow onClick={() => history.push(`/coins/${row.id}`)}
                    className={classes.row}
                    key={row.name}>
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