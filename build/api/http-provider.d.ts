import { AxiosRequestConfig } from 'axios';
export declare class HTTPProvider {
    readonly host: string;
    constructor(host: string);
    get<ResponseType>(url: string): Promise<ResponseType>;
    post<ResponseType>(url: string, data: AxiosRequestConfig['data']): Promise<ResponseType>;
    stream<ResponseType>(url: string, data: any): Promise<ResponseType>;
}
