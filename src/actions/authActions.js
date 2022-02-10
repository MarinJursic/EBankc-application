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
} from "./types";

import { returnErrors } from "./errorActions";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
};

export const registerUser =
  ({ email, password }) =>
  (dispatch) => {
    const name = email.substring(0, email.indexOf("@"));

    const wallet = {
      EBCT: {
        wallet: 1928,
        deployed: 967,
      },
      BTC: {
        wallet: 1986,
        deployed: 187,
      },
      ETH: {
        wallet: 1312,
        deployed: 321,
      },
      BNB: {
        wallet: 1965,
        deployed: 567,
      },
      USDC: {
        wallet: 1928,
        deployed: 860,
      },
      USDT: {
        wallet: 1950,
        deployed: 870,
      },
    };

    const level = 1;

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
      EBCT: {
        wallet: 1928,
        deployed: 967,
      },
      BTC: {
        wallet: 1986,
        deployed: 187,
      },
      ETH: {
        wallet: 1312,
        deployed: 321,
      },
      BNB: {
        wallet: 1965,
        deployed: 567,
      },
      USDC: {
        wallet: 1928,
        deployed: 860,
      },
      USDT: {
        wallet: 1950,
        deployed: 870,
      },
    };

    const level = 1;

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
