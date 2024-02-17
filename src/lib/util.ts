import { isUndefined } from 'lodash-es';

const util = {

    unixTimestamp() {
        return Math.floor(Date.now() / 1000);
    },

    timestamp() {
        return Date.now();
    },

    buildQueryString(query: {[key: string]: any}) {
        let queryString = '';
        for(let key in query)
            if(!isUndefined(query[key]))
                queryString += `${key}=${query[key]}&`;
        queryString && (queryString = `?${queryString.slice(0, -1)}`);
        return queryString;
    },

    dateFormat: (date: Date) => {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes;
    }

};

export default util;