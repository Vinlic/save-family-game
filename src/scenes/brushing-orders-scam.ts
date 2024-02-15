import Scene from "@/lib/Scene";

class OnlineShoppingScam extends Scene {

    constructor() {
        super({
            id: 'brushing-orders-scam',
            name: '贪小失大',
            description: '姐姐收到一个陌生的快递，里面有一支笔和一张“回馈客户”的二维码卡片，扫描后进入一个刷单群，发现群里有人发链接，可以领任务刷单赚钱，于是下载了做任务的APP，做一些淘宝刷单任务，赚到了四五百元钱，并成功提现。闲下来时看到群里又发刷单任务，抢到了一个1023元任务单，得知刷完连本带利可以拿到1330元，心里非常喜悦。',
            coverResId: 'images.scene_brushing_orders_scam' 
        });
    }

}

export default new OnlineShoppingScam();