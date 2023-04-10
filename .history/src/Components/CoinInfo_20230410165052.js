import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { createTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  }, 
}));

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false);
  const { currency } = CryptoState();

  const classes = useStyles();

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricData(data.prices);
      setFlag(true);
    } catch (error) {
      console.error(error);
    }
  };

   useEffect(() => {
   fetchHistoricData();
   }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!flag ? (
          <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return time;
                }),
                datasets: [
                  {
                    label: `${coin.name} Price`,
                    data: historicData.map((coin) => coin[1]),
                    fill: false,
                    backgroundColor: "#ffff",
                    borderColor: "#fff",
                    //só trocar isso aqui em minha defesa n to bem hj ;-;
                    // rlx kkkk
                    // num ri
                    //pode voltar a ouvir sua musica, vou sair aqui kkkkmalvado minha barriga ta doendo ;-;
                    // vou pedir o uber já ent kkkk
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Time",
                    },
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10,
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Price",
                    },
                    ticks: {
                      callback: function (value, index, values) {
                        return "$" + value;
                      },
                    },
                  },
                },
              }}
            />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
