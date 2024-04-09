// const HttpService = require("./httpService").default;
// const { env } = require("../../env");

import HttpService from './httpService'

import {envKey} from '../../Url'

export const httpService = new HttpService(envKey.BASE_URL, '');

