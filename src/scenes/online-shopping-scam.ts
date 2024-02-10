import Scene from "@/lib/Scene";

class OnlineShoppingScam extends Scene {

    constructor() {
        super({
            id: 'online-shopping-scam',
            name: '网购骗局',
            coverResId: 'images.image_online_shopping_scam' 
        });
    }

}

export default new OnlineShoppingScam();