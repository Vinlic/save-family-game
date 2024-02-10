import Scene from "@/lib/Scene";
import strangerScam from "./stranger-scam";

const scenes = [

    // 陌生人骗局
    strangerScam

] as Scene[];

const _scenesMap: Record<string, Scene> = {};
scenes.forEach(scene => _scenesMap[scene.id] = scene);

export const scenesMap = _scenesMap;
export default scenes;