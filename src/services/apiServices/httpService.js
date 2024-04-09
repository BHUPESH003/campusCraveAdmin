// const { StatusCode } = require("./StatusCode");
// const { axiosRequestConfiguration } = require("./config");
// const axios = require("axios");

import {StatusCode} from './StatusCode'
import {axiosRequestConfiguration} from './config'
import axios from 'axios';


export default class HttpService {
  constructor(backendRootUrl, navigationRootUrl) {
    this.backendRootUrl = backendRootUrl ?? "";
    this.isReady = false;
    this.instance = axios.create();
    this.navigationRootUrl = navigationRootUrl ?? "";
  }
  get http() {
    if (!this.isReady) {
      this.initHttp();
    }
    return this.instance;
  }
  set http(inst) {
    this.instance = inst;
    this.isReady = true;
  }
  initHttp() {
    const http = axios.create(axiosRequestConfiguration);

    http.interceptors.request.use(
      async (config) => {
        try {
          const xApiKey = sessionStorage.getItem("x-api-key");
          config.headers["apiKey"] = xApiKey;
        } catch (err) {
          throw new Error(err);
        }
        return config;
      }
    );
    http.interceptors.response.use(
      (response) => {
        return Promise.resolve(response.data);
      },
      () => {
        return new Promise((reject) => {
          reject("error");
        });
      }
    );
    this.http = http;
    return http;
  }

  get(url, config) {
    return this.http.get(url, config).catch((err) => {
      return this.handleError(err);
    });
  }
  post(url, data, config) {
    return this.http.post(url, data, config).catch((err) => {
      return this.handleError(err);
    });
  }
  handleError(error) {
    const { status } = error;
    switch (status) {
      case StatusCode.InternalServerError: {
        break;
      }
      case StatusCode.Forbidden: {
        break;
      }
      case StatusCode.Unathorized: {
        break;
      }
      case StatusCode.TooManyRequests: {
        break;
      }
    }
    return Promise.reject(error);
  }
}

