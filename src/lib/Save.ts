import SceneResult from './SceneResult';
import util from './util';

interface SaveCreateOptions {
  id: string;
  username: string;
  currentSceneId: string;
  scenesResultMap: Record<string, SceneResult>;
}

export default class Save {

  id: string;
  username: string;
  currentSceneId: string;
  scenesResultMap: Record<string, SceneResult>;
  updateTime: number;
  createTime: number;

  constructor(options: SaveCreateOptions) {
    this.id = options.id || "";
    this.username = options.username;
    this.currentSceneId = options.currentSceneId;
    this.scenesResultMap = options.scenesResultMap || {};
    this.updateTime = util.timestamp();
    this.createTime = util.timestamp();
  }
}
