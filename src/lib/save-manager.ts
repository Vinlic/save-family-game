import _ from "lodash-es";
import scenes from '@/scenes';
import Save from "./Save";
import util from "./util";

interface SaveCreateOptions {
  username: string;
}

class SaveManager {

  currentSave: Save | null = null;

  create(options: SaveCreateOptions) {
    const id = `save-${Date.now()}`;
    const scene = scenes[0];
    const save = new Save({
        id,
        sceneId: scene.id,
        ...options
    });
    window.localStorage.setItem(id, JSON.stringify(save));
    this.currentSave = save;
    return save;
  }

  getList() {
    const list: Save[] = [];
    for(let key in localStorage) {
        if(!/^save\-/.test(key))
            continue;
        const save = this.load(key);
        save && list.push(save);
    }
    return list;
  }

  load(id: string) {
    const raw = window.localStorage.getItem(id);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const save = new Save(data);
    this.currentSave = save;
    return save;
  }

  save(id: string, data = {}) {
    const save = this.load(id);
    if (!save) throw new Error(`Save ${id} not found`);
    _.merge(save, _.cloneDeep(data));
    save.updateTime = util.timestamp();
    window.localStorage.setItem(id, JSON.stringify(save));
    return save;
  }
}

export default new SaveManager();
