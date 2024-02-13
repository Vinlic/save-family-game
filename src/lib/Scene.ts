interface SceneOptions {
    id: string;
    name: string;
    description: string;
    coverResId: string;
}

export default class Scene {

    id: string;
    name: string;
    description: string;
    coverResId: string;

    constructor(options: SceneOptions) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.coverResId = options.coverResId;
    }

}