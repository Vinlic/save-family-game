interface SaveResultCreateOptions {
    score?: number;
}

export default class SaveResult {

    score: number;

    constructor(options: SaveResultCreateOptions = {}) {
        this.score = options.score || 0;
    }

}