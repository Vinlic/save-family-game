import Scene from "@/lib/Scene";
import strangerScam from "./stranger-scam";
import resumeScam from "./resume-scam";
import teaPickingGirlScam from "./tea-picking-girl-scam";
import onlineShoppingScam from "./online-shopping-scam";
import internetDatingScam from "./internet-dating-scam";

const scenes = [

    // 陌生人骗局
    strangerScam,

    // 招聘骗局
    resumeScam,

    // 采茶女骗局
    teaPickingGirlScam,

    // 网购骗局
    onlineShoppingScam,

    // 网络交友骗局
    internetDatingScam

] as Scene[];

const _scenesMap: Record<string, Scene> = {};
scenes.forEach(scene => _scenesMap[scene.id] = scene);

export const scenesMap = _scenesMap;
export default scenes;