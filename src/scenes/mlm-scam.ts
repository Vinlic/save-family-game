import Scene from "@/lib/Scene";

class MLMScam extends Scene {

    constructor() {
        super({
            id: 'mlm-scam',
            name: '传销骗局',
            coverResId: 'images.image_mlm_scam' 
        });
    }

}

export default new MLMScam();