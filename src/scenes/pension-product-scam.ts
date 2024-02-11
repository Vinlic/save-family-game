import Scene from "@/lib/Scene";

class PensionProductScam extends Scene {

    constructor() {
        super({
            id: 'pension-product-scam',
            name: '养老产品骗局',
            coverResId: 'images.image_pension_product_scam' 
        });
    }

}

export default new PensionProductScam();