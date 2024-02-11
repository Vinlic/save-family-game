import Scene from "@/lib/Scene";

class HealthProductScam extends Scene {

    constructor() {
        super({
            id: 'health-product-scam',
            name: '包治百病',
            coverResId: 'images.image_health_product_scam' 
        });
    }

}

export default new HealthProductScam();