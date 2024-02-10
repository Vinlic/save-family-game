import Scene from "@/lib/Scene";

class ResumeScam extends Scene {

    constructor() {
        super({
            id: 'resume-scam',
            name: '招聘骗局',
            coverResId: 'images.image_resume_scam' 
        });
    }

}

export default new ResumeScam();