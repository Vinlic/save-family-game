import axios, {
    type AxiosRequestConfig,
    type AxiosResponse
} from 'axios';
import _ from 'lodash-es';

import config from './config';
import EX, { findException, Exception } from './exceptions';
import sessionManager from './session-manager';
import util from './util';

const origin: { [key: string]: string } = config.origin;

interface RequestOptions extends AxiosRequestConfig {
    // query参数
    query?: {[key: string]: any};
    // 用户凭证
    token?: string;
    // 是否需要验证
    authRequired?: boolean;
    // 是否外部请求
    externalRequest?: boolean;
    // 重试次数限制
    retryLimit?: number;
    // 已重试次数
    _retryCount?: number;
}

class Requester {

    baseUrl: string;

    constructor(originName: string) {
        this.baseUrl = origin[originName] || '';
    }

    async get(url: string, query?: any, options?: RequestOptions): Promise<any> {
        return await this.request({
            method: 'GET',
            url,
            query,
            ...options
        });
    }

    async post(url: string, data?: any, options?: RequestOptions): Promise<any> {
        return await this.request({
            method: 'POST',
            url,
            data: data || {},
            ...options
        });
    }

    async request(options: RequestOptions): Promise<any> {
        let { url, query = {}, headers = {}, token, authRequired = true, externalRequest = false, retryLimit = 5, _retryCount = 0 } = options;
        Object.assign(options, { query, authRequired, retryLimit, _retryCount });
        if(authRequired && !token) {
            const session = await sessionManager.acquireSession();
            token = session.token;
        }
        const result = await new Promise(resolve => {
            const queryString = util.buildQueryString(query);
            axios.request({
                ...options,
                url: `${externalRequest ? '' : this.baseUrl}${url}${queryString}`,
                headers: {
                    ...headers,
                    Token: token || undefined
                }
            })
                .then(response => {
                    if(externalRequest)
                        return resolve(this.responseHandle(response));
                    try {
                        const result = this.resultHandle(this.responseHandle(response));
                        resolve(result);
                    }
                    catch (err: any) {
                        console.error(err);
                        resolve({
                            code: -1,
                            message: err.message || 'Unkown error',
                            data: {}
                        })
                    }
                })
                .catch(err => resolve(this.resultHandle({
                    code: -1,
                    message: err.errMsg,
                    data: {}
                })));
        });
        if(result instanceof Exception) {
            const exception = result;
            if(!authRequired || _retryCount >= retryLimit)
                throw exception;
            const conditions = [
                EX.API_USER_NOT_FOUND.compare(exception),
                EX.API_ROLE_NOT_FOUND.compare(exception),
                EX.API_TOKEN_EXPIRED.compare(exception),
                EX.API_TOKEN_INVALID.compare(exception)
            ];
            if(!conditions.includes(true))
                throw exception;
            // 销毁现有的会话
            sessionManager.destorySession();
            const session = await sessionManager.acquireSession();
            options.token = session.token;
            (options._retryCount as number)++;
            await new Promise(resolve => setTimeout(resolve, 300));
            return await this.request(options);
        }
        return result;
    }

    responseHandle(response: AxiosResponse) {
        if (response.status !== 200)
            return EX.APP_REQUEST_FAILED.MSG(`请求失败：[${response.status}] ${response.statusText}`);
        return response.data;
    }

    resultHandle(result: any) {
        if(result instanceof Exception)
            return result;
        const { code, message } = result;
        if (code !== 0) {
            const exception = findException(code);
            if(!exception)
                return EX.APP_REQUEST_FAILED.AMSG(`[${code}] ${message}`)
            return exception;
        }
        return result.data;
    }

}

export const api = new Requester('api');