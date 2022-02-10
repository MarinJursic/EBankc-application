import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_USER,
  UPDATE_WALLET,
} from "./types";

import { returnErrors } from "./errorActions";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
};

export const convertAssets =
  (assetFrom, assetTo, amount) => (dispatch, getState) => {
    const wallet = getState().auth.user.wallet;
    const prices = getState().price.prices;

    wallet.assets[assetFrom].wallet -= amount;

    const convertedAmount = (amount * prices[assetFrom]) / prices[assetTo];

    wallet.assets[assetTo].wallet += convertedAmount;

    dispatch({
      type: UPDATE_WALLET,
      payload: wallet,
    });
  };

export const registerUser =
  ({ email, password }) =>
  (dispatch) => {
    const name = email.substring(0, email.indexOf("@"));

    const wallet = {
      earnings: {
        dailyEarnings: 1000,
        weeklyEarnings: 2800,
        monthlyEarnings: 4500,
      },
      assets: {
        EBCT: {
          wallet: 1928,
          holding: 967,
        },
        BTC: {
          wallet: 1986,
          holding: 123456789123,
        },
        ETH: {
          wallet: 1312,
          holding: 123456789123456789,
        },
        BNB: {
          wallet: 1965,
          holding: 9999999999999,
        },
        USDC: {
          wallet: 1928,
          holding: 860,
        },
        USDT: {
          wallet: 1950,
          holding: 870,
        },
      },
    };

    const level = 2;

    const user = { name, email, password, country: "USA", wallet, level };

    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user },
    });
  };

export const loginUser =
  ({ email, password }) =>
  (dispatch) => {
    const name = email.substring(0, email.indexOf("@"));

    const wallet = {
      earnings: {
        dailyEarnings: 1000,
        weeklyEarnings: 2800,
        monthlyEarnings: 4500,
      },
      assets: {
        EBCT: {
          wallet: 11,
          holding: 23,
        },
        BTC: {
          wallet: 1,
          holding: 2,
        },
        ETH: {
          wallet: 24,
          holding: 0.5,
        },
        BNB: {
          wallet: 7.9,
          holding: 56.7,
        },
        USDC: {
          wallet: 2050,
          holding: 100,
        },
        USDT: {
          wallet: 3078,
          holding: 200,
        },
      },
    };

    const level = 2;

    const user = { name, email, password, country: "USA", wallet, level };

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
  };

export const enableTwoFactorAuth = (enabled) => (dispatch, getState) => {
  let user = getState().auth.user;

  user.twoFactorAuthEnabled = enabled;

  dispatch({
    type: UPDATE_USER,
    payload: user,
  });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
