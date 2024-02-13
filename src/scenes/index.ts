import Scene from "@/lib/Scene";
import giftRedemptionScam from "./gift-redemption-scam";
import resumeScam from "./resume-scam";
import teaPickingGirlScam from "./tea-picking-girl-scam";
import onlineShoppingScam from "./online-shopping-scam";
import internetDatingScam from "./internet-dating-scam";
import nudeChatScam from "./nude-chat-scam";
import lostExpressScam from "./lost-express-scam";
import familyAccidentScam from "./family-accident-scam";
import phoneManipulationScam from "./phone-manipulation-scam";
import impersonatingPublicSecurityProcuratorateScam from "./impersonating-public-security-procuratorate-scam";
import onlineLoanScam from "./online-loan-scam";
import mlmScam from "./mlm-scam";
import aiVtuberScam from "./ai-vtuber-scam";
import pensionProductScam from "./pension-product-scam";
import healthProductScam from "./health-product-scam";
import witchScam from "./witch-scam";

const scenes = [

    // 礼品兑换骗局
    giftRedemptionScam,

    // 招聘骗局
    resumeScam,

    // 采茶女骗局
    teaPickingGirlScam,

    // 网购骗局
    onlineShoppingScam,

    // 网络交友骗局
    internetDatingScam,

    // 裸聊骗局
    nudeChatScam,

    // 快递丢失骗局
    lostExpressScam,

    // 家人意外骗局
    familyAccidentScam,

    // 电话操控骗局
    phoneManipulationScam,

    // 冒充公检法骗局
    impersonatingPublicSecurityProcuratorateScam,

    // 网贷骗局
    onlineLoanScam,

    // 传销骗局
    mlmScam,

    // AI数字人骗局
    aiVtuberScam,

    // 养老产品骗局
    pensionProductScam,

    // 保健品骗局
    healthProductScam,

    // 神婆骗局
    witchScam


] as Scene[];

const _scenesMap: Record<string, Scene> = {};
scenes.forEach(scene => _scenesMap[scene.id] = scene);

export const scenesMap = _scenesMap;
export default scenes;