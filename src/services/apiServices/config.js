// const { env } = require("../../env");
import {envKey} from '../../Url'

export const axiosRequestConfiguration = {
  baseURL: envKey.BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
};

