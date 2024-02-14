import Scene from "@/lib/Scene";

class MentalManipulationScam extends Scene {

    constructor() {
        super({
            id: 'mental-manipulation-scam',
            name: '提线木偶',
            description: '哥哥最近找了许多人借钱，',
            coverResId: 'images.scene_mental_manipulation_scam' 
        });
    }

}

export default new MentalManipulationScam();