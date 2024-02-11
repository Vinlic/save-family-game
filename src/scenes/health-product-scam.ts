import Scene from "@/lib/Scene";

class HealthProductScam extends Scene {

    constructor() {
        super({
            id: 'health-product-scam',
            name: '神婆骗局',
            coverResId: 'images.image_witch_scam' 
        });
    }

}

export default new HealthProductScam();