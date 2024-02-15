import Scene from "@/lib/Scene";

class InternetDatingScam extends Scene {

    constructor() {
        super({
            id: 'online-shopping-scam',
            name: '你爱上了我？',
            description: '在游戏中认识了一位',
            coverResId: 'images.scene_internet_dating_scam' 
        });
    }

}

export default new InternetDatingScam();