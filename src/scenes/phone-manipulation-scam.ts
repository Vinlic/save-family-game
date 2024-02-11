import Scene from "@/lib/Scene";

class PhoneManipulationScam extends Scene {

    constructor() {
        super({
            id: 'phone-manipulation-scam',
            name: '电话操控骗局',
            coverResId: 'images.image_phone_manipulation_scam' 
        });
    }

}

export default new PhoneManipulationScam();