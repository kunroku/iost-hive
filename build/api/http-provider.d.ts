import { AxiosRequestConfig } from 'axios';
import { HTTPProviderAdapter } from '../iwallet/iwallet-adapter';
export declare class HTTPProvider extends HTTPProviderAdapter {
    get<ResponseType>(url: string): Promise<ResponseType>;
    post<ResponseType>(url: string, data: AxiosRequestConfig['data']): Promise<ResponseType>;
    stream<ResponseType>(url: string, data: any): Promise<ResponseType>;
}
