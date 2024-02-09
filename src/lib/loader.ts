import axios from 'axios';
import resourcesMap from './resources';

class Loader {

    progress = 0;
    images = new Map<string, string>();
    audios = new Map<string, string>();
    videos = new Map<string, string>();
    queue: any[] = [];

    async loadImage(key: string, url: string, allowMIMETypes: string[] = ['image/jpeg', 'image/png', 'image/gif']) {
        const result = await axios.get(url, {
            responseType: 'blob'
        });
        if(result.status != 200)
            throw new Error(`Image resource load failed: ${result.status} - ${result.statusText}`);
        const contentType: string = result.headers['content-type'] || result.headers['Content-Type'];
        if(!allowMIMETypes.includes(contentType))
            throw new Error(`Image resource content type invalid: ${contentType} not in ${JSON.stringify(allowMIMETypes)}`);
        this.images.set(key, URL.createObjectURL(result.data));
    }

    async loadAudio(key: string, url: string, allowMIMETypes: string[] = ['audio/mpeg', 'audio/mp3']) {
        const result = await axios.get(url, {
            responseType: 'blob'
        });
        if(result.status != 200)
            throw new Error(`Audio resource load failed: ${result.status} - ${result.statusText}`);
        const contentType: string = result.headers['content-type'] || result.headers['Content-Type'];
        if(!allowMIMETypes.includes(contentType as string))
            throw new Error(`Audio resource content type invalid: ${contentType} not in ${JSON.stringify(allowMIMETypes)}`);
        this.audios.set(key, URL.createObjectURL(result.data));
    }

    async loadVideo(key: string, url: string, allowMIMETypes: string[] = ['video/mp4']) {
        const result = await axios.get(url, {
            responseType: 'blob'
        });
        if(result.status != 200)
            throw new Error(`Video resource load failed: ${result.status} - ${result.statusText}`);
        const contentType: string = result.headers['content-type'] || result.headers['Content-Type'];
        if(!allowMIMETypes.includes(contentType as string))
            throw new Error(`Video resource content type invalid: ${contentType} not in ${JSON.stringify(allowMIMETypes)}`);
        this.videos.set(key, URL.createObjectURL(result.data));
    }

    async run() {
        for(let _type in resourcesMap) {
            const map = (resourcesMap as any)[_type] || {};
            switch(_type) {
                case 'images':
                    for(let key in map)
                        this.queue.push(async () => this.loadImage(key, map[key]));
                break;
                case 'audios':
                    for(let key in map)
                        this.queue.push(async () => this.loadAudio(key, map[key]));
                break;
                case 'videos':
                    for(let key in map)
                        this.queue.push(async () => this.loadVideo(key, map[key]));
                break;
            }
        }
        const loadPromises = [];
        for(let task of this.queue)
            loadPromises.push(task());
        await Promise.all(loadPromises);
    }

}

export default new Loader();