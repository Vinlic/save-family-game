import Scene from "@/lib/Scene";

class StrangerScam extends Scene {

    constructor() {
        super({
            id: 'stranger-scam',
            name: '陌生人骗局',
            coverResId: 'images.image_stranger_scam' 
        });
    }

}

export default new StrangerScam();