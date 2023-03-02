import axios, { AxiosRequestConfig } from 'axios';
import { HTTPProviderAdapter } from '../iwallet/iwallet-adapter';

export class HTTPProvider extends HTTPProviderAdapter {
  async get<ResponseType>(url: string) {
    try {
      const res = await axios<ResponseType>({
        method: 'get',
        baseURL: this._host,
        url,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`${JSON.stringify(error.response.data)}`);
      } else {
        throw new Error(error.message);
      }
    }
  }
  async post<ResponseType>(url: string, data: AxiosRequestConfig['data']) {
    try {
      const res = await axios<ResponseType>({
        method: 'post',
        baseURL: this._host,
        url,
        data,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`${JSON.stringify(error.response.data)}`);
      } else {
        throw new Error(error.message);
      }
    }
  }
  async stream<ResponseType>(url: string, data: any) {
    try {
      const res = await axios<ResponseType>({
        method: 'post',
        baseURL: this._host,
        url,
        data,
        headers: {
          'Content-Type': 'text/plain',
        },
        responseType: 'stream',
      });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`${JSON.stringify(error.response.data)}`);
      } else {
        throw new Error(error.message);
      }
    }
  }
}
