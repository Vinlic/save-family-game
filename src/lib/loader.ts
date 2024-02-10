import axios from 'axios';
import _ from 'lodash-es';
import resourcesMap from './resources';

class Loader {

    progress = 0;
    images: Record<string, string> = {};
    audios: Record<string, string> = {};
    videos: Record<string, string> = {};
    queue: any[] = [];
    #lock = false;
    #loaded = false;
    #loadQueue: any[] = [];

    getResUrl(id: string) {
        return _.get(this, id) || '';
    }

    async loadImage(key: string, url: string, onProgress: Function, allowMIMETypes: string[] = ['image/jpeg', 'image/png', 'image/gif']) {
        const result = await axios.get(url, {
            onDownloadProgress: e => onProgress((e.progress || 0) * 100),
            responseType: 'blob'
        });
        if(result.status != 200)
            throw new Error(`Image resource load failed: ${result.status} - ${result.statusText}`);
        const contentType: string = result.headers['content-type'] || result.headers['Content-Type'];
        if(!allowMIMETypes.includes(contentType))
            throw new Error(`Image resource content type invalid: ${contentType} not in ${JSON.stringify(allowMIMETypes)}`);
        this.images[key] = URL.createObjectURL(result.data);
    }

    async loadAudio(key: string, url: string, onProgress: Function, allowMIMETypes: string[] = ['audio/mpeg', 'audio/mp3']) {
        const result = await axios.get(url, {
            onDownloadProgress: e => onProgress((e.progress || 0) * 100),
            responseType: 'blob'
        });
        if(result.status != 200)
            throw new Error(`Audio resource load failed: ${result.status} - ${result.statusText}`);
        const contentType: string = result.headers['content-type'] || result.headers['Content-Type'];
        if(!allowMIMETypes.includes(contentType as string))
            throw new Error(`Audio resource content type invalid: ${contentType} not in ${JSON.stringify(allowMIMETypes)}`);
        this.audios[key] = URL.createObjectURL(result.data);
    }

    async loadVideo(key: string, url: string, onProgress: Function, allowMIMETypes: string[] = ['video/mp4']) {
        const result = await axios.get(url, {
            onDownloadProgress: e => onProgress((e.progress || 0) * 100),
            responseType: 'blob'
        });
        if(result.status != 200)
            throw new Error(`Video resource load failed: ${result.status} - ${result.statusText}`);
        const contentType: string = result.headers['content-type'] || result.headers['Content-Type'];
        if(!allowMIMETypes.includes(contentType as string))
            throw new Error(`Video resource content type invalid: ${contentType} not in ${JSON.stringify(allowMIMETypes)}`);
        this.videos[key] = URL.createObjectURL(result.data);
    }

    async load(onProgress?: Function) {
        if(this.#loaded)
            return;
        if(this.#lock) {
            const loadPromise = new Promise((resolve, reject) => this.#loadQueue.push({ resolve, reject }));
            return loadPromise;
        }
        this.#lock = true;
        let singleProgress = 0;
        for(let _type in resourcesMap) {
            const map = (resourcesMap as any)[_type] || {};
            for(let key in map) {
                this.queue.push(async () => {
                    let lastProgress = 0;
                    let loadFn;
                    switch(_type) {
                        case 'images':
                            loadFn = this.loadImage.bind(this);
                        break;
                        case 'audios':
                            loadFn = this.loadAudio.bind(this);
                        break;
                        case 'videos':
                            loadFn = this.loadVideo.bind(this);
                        break;
                        default:
                            loadFn = null;
                    }
                    if(!loadFn)
                        return;
                    await loadFn(key, map[key], (progress: number) => {
                        const currentProgress = progress * (singleProgress / 100);
                        this.progress += currentProgress - lastProgress;
                        lastProgress = currentProgress;
                    });
                    onProgress && onProgress(this.progress);
                });
            }
        }
        singleProgress = 100 / this.queue.length;
        const loadPromises = [];
        for(let task of this.queue)
            loadPromises.push(task());
        await Promise.all(loadPromises)
            .then(() => this.#loadQueue.forEach(({ resolve }) => resolve(this)))
            .catch(err => this.#loadQueue.forEach(({ reject }) => reject(err)));
        this.#loaded = true;
        this.progress = 100;
        onProgress && onProgress(this.progress);
        this.#lock = false;
        return this;
    }

}

export default new Loader();