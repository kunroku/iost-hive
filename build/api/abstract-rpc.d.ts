import { AxiosRequestConfig } from 'axios';
export declare abstract class AbstractRPC {
    private readonly host;
    constructor(host: string);
    protected get<ResponseType>(url: string): Promise<ResponseType>;
    protected post<ResponseType>(url: string, data: AxiosRequestConfig['data']): Promise<ResponseType>;
    protected stream<ResponseType>(url: string, data: any): Promise<ResponseType>;
}
