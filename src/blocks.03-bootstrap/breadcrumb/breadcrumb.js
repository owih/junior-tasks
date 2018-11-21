const Instances = [];
const ClassName = {
    BLOCK: 'breadcrumb',
    ITEM: 'breadcrumb__item',
    LIST: 'breadcrumb__list',
};
class Breadcrumb {
    constructor(elem) {
        Instances.push(this);
        // Bind functions;
        this.getMods = this.getMods.bind(this);
        this.initSwiper = this.initSwiper.bind(this);
        this.updateSwiper = this.updateSwiper.bind(this);
        
        this.block = elem;
        this.mods = this.getMods();
        if (this.mods.fluid) {
            this.swiper = false;
            this.initSwiper();
        }
    }
    getMods() {
        let reg = new RegExp(`${ClassName.BLOCK}[_]?`, 'g');
        return Array.from(this.block.classList).map((cls)=> cls.replace(reg, '')).filter((cls) => cls).reduce((res, cur) => {
            let mod = cur.split('_');
            res[mod[0]] = mod[1] ? mod[1] : true;
            return res;
        }, {});
    }
    initSwiper() {
        if (!this.swiper) {
            this.swiper = new Swiper(this.block, {
                slidesPerView: 'auto',
                spaceBetween: 0,
                freeMode: true,
                freeModeMomentum: false,
                containerModifierClass: `${ClassName.BLOCK}_`,
                slideClass: ClassName.ITEM,
                wrapperClass: ClassName.LIST,
                slideActiveClass: `${ClassName.ITEM}_active`,
                slideNextClass: `${ClassName.ITEM}_next`,
                slidePrevClass: `${ClassName.ITEM}_prev`,
                slideDuplicateNextClass: `${ClassName.ITEM}_duplicate_next`,
                slideDuplicatePrevClass: `${ClassName.ITEM}_duplicate_prev`,
            });
        }
    }
    updateSwiper() {
        if (!this.swiper) {
            this.initSwiper();
            return;
        }
        this.swiper.update();
    }
    static getAllInstances () {
        return Instances;
    }
    static getAllBlocks () {
        return Array.from(document.getElementsByClassName(ClassName.BLOCK));
    }
    static initAllBlocks () {
        let Instances = Breadcrumb.getAllInstances();
        let Blocks = Breadcrumb.getAllBlocks();
        let BlocksInited = Instances.map((ins) => ins.block);
        let BlockNoInited = Blocks.filter((block) => BlocksInited.indexOf(block) < 0);
        BlockNoInited.forEach((item) => new Breadcrumb(item));
        return Instances;
    }
}
// Инициашизация;
Breadcrumb.initAllBlocks();

// Экспорт;
window.Block = window.Block ? window.Block : {};
window.Block.Breadcrumb = Breadcrumb;
export default Breadcrumb;