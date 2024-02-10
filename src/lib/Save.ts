import util from './util';

interface SaveCreateOptions {
  id: string;
  username: string;
  sceneId: string;
}

export default class Save {
  id: string;
  username: string;
  sceneId: string;
  updateTime: number;
  createTime: number;

  constructor(options: SaveCreateOptions) {
    this.id = options.id || "";
    this.username = options.username;
    this.sceneId = options.sceneId;
    this.updateTime = util.timestamp();
    this.createTime = util.timestamp();
  }
}
