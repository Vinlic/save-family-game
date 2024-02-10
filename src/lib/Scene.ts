interface SceneOptions {
    id: string;
    name: string;
    coverResId: string;
}

export default class Scene {

    id: string;
    name: string;
    coverResId: string;

    constructor(options: SceneOptions) {
        this.id = options.id;
        this.name = options.name;
        this.coverResId = options.coverResId;
    }

}