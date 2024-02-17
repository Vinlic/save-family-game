import _ from 'lodash-es';

import util from '@/lib/util';
import type { Router } from 'vue-router';

interface Session {
    // 用户凭证
    token: string;
    // 过期时间
    expireTime: number;
}

class SessionManager {

    #router?: Router;
    #session: any = null;
    #acquireLock = false;
    #acquireQueue: Function[] = [];

    setRouter(router: Router) {
        this.#router = router;
    }

    async checkSession() {
        const session = await this.getSession();
        if (!session || !_.isFinite(session.expireTime) || util.unixTimestamp() >= session.expireTime)
            return false;
        return true;
    }

    async acquireSession(): Promise<Session> {
        const session: Session | Error = await new Promise(resolve => {
            (async () => {
                if (this.#session && util.unixTimestamp() < this.#session.expireTime)
                    return this.#session;
                if (this.#acquireLock)
                    return new Promise(resolve => this.#acquireQueue.push(resolve));
                this.#acquireLock = true;
                let session;
                if (!await this.checkSession()) {
                    console.info('登录态已过期');
                    this.destorySession();
                    console.info('登录态获取中...');
                    // 处理登录态
                    console.info('登录态获取成功');
                    this.saveSession(session);
                }
                else {
                    console.info('登录态缓存有效');
                    session = (await this.getSession()) as Session;
                }
                this.#acquireLock = false;
                this.#session = session;
                let callback;
                while ((callback = this.#acquireQueue.shift()))
                    callback(session);
                return session;
            })()
                .then(resolve)
                .catch(resolve)
        });
        if(_.isError(session)) {
            this.#acquireQueue = []
            this.#acquireLock = false;
            throw session;
        }
        return session;
    }

    async getSession(): Promise<Session | null> {
        const data = localStorage.getItem('session');
        if (!data)
            return null;
        const session = _.attempt(() => JSON.parse(data));
        if (_.isError(session) || !session.token) {
            this.removeSession();
            return null;
        }
        return session;
    }

    saveSession(session: Session) {
        localStorage.setItem('session', JSON.stringify(session));
    }

    removeSession() {
        localStorage.removeItem('session');
    }

    destorySession() {
        this.#session = null;
        this.removeSession();
        console.info('服务登录态已销毁');
    }

}

export default new SessionManager()