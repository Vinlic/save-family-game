import Scene from "@/lib/Scene";

class LostExpressScam extends Scene {

    constructor() {
        super({
            id: 'lost-express-scam',
            name: '我快递丢了？',
            coverResId: 'images.image_lost_express_scam' 
        });
    }

}

export default new LostExpressScam();