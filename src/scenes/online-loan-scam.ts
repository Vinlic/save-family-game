import Scene from "@/lib/Scene";

class OnlineLoanScam extends Scene {

    constructor() {
        super({
            id: 'online-loan-scam',
            name: '网贷骗局',
            coverResId: 'images.image_online_loan_scam' 
        });
    }

}

export default new OnlineLoanScam();