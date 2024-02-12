import Scene from "@/lib/Scene";

class WitchScam extends Scene {

    constructor() {
        super({
            id: 'witch-scam',
            name: '心里有鬼',
            coverResId: 'images.scene_witch_scam' 
        });
    }

}

export default new WitchScam();