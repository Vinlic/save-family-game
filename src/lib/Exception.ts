import _ from 'lodash-es';

export class Exception extends Error {

    code: number;
    _message: string;
    error?: Error;
    
    constructor(code: number, message: string, error?: Error) {
        if(_.isString(error))
            error = new Error(error);
        super(`[${code}] ${message}${error?.stack || ''}`);
        this.code = code;
        this._message = message;
        this.error = error;
    }

    codeCompare(code: number) {
        return code == this.code;
    }

    compare(exception: Exception) {
        return this.code === exception.code;
    }
    
    CODE(code: number) {
        return new Exception(code, this._message, this.error);
    }

    AMSG(message: string) {
        return new Exception(this.code, this._message + ' ' + message, this.error);
    }

    MSG(message: string) {
        return new Exception(this.code, message, this.error);
    }

    ERR(error: Error) {
        return new Exception(this.code, this._message, error);
    }

}

export default (code: number, message: string, error?: Error) => new Exception(code, message, error);