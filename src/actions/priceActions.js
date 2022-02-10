/* eslint-disable no-loop-func */
import { GET_PRICE } from "./types";
import axios from "axios";

export const getPrices = () => async (dispatch) => {
  const coins = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];

  let cijene = {
    BTC: 0,
    ETH: 0,
    BNB: 0,
    USDC: 1,
    USDT: 1,
    EBCT: 1.2,
  };
  const keys = Object.keys(cijene);

  for await (const [i, coin] of coins.entries()) {
    axios
      .get(`https://api.binance.com/api/v3/ticker/price?symbol=${coin}`)
      .then((data) => {
        cijene[keys[i]] = parseFloat(data.data.price);
      });
  }

  dispatch({
    type: GET_PRICE,
    payload: cijene,
  });
};
