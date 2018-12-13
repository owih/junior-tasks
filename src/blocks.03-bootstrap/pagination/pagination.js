import Swiper from 'swiper';
const Instances = [];
const ClassName = {
    BLOCK: 'pagination',
    ITEM: 'pagination__item',
    LIST: 'pagination__list',
    CONTROL: 'pagination__control',
    CONTROL_PREV: 'pagination__control_prev',
    CONTROL_NEXT: 'pagination__control_next',
};
class Pagination {
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
                containerModifierClass: `${ClassName.BLOCK}_`,
                slideClass: ClassName.ITEM,
                wrapperClass: ClassName.LIST,
                slideActiveClass: `${ClassName.ITEM}_active`,
                slideNextClass: `${ClassName.ITEM}_next`,
                slidePrevClass: `${ClassName.ITEM}_prev`,
                slideDuplicateNextClass: `${ClassName.ITEM}_duplicate_next`,
                slideDuplicatePrevClass: `${ClassName.ITEM}_duplicate_prev`,
                navigation: {
                    nextEl: this.block.getElementsByClassName(ClassName.CONTROL_NEXT),
                    prevEl: this.block.getElementsByClassName(ClassName.CONTROL_PREV),
                    disabledClass: `${ClassName.CONTROL}_disabled`,
                    hiddenClass: `${ClassName.CONTROL}_hidden`,
                },
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
    static getAllInstances() {
        return Instances;
    }
    static getAllBlocks() {
        return Array.from(document.getElementsByClassName(ClassName.BLOCK));
    }
    static initAllBlocks() {
        let Instances = Pagination.getAllInstances();
        let Blocks = Pagination.getAllBlocks();
        let BlocksInited = Instances.map((ins) => ins.block);
        let BlockNoInited = Blocks.filter((block) => BlocksInited.indexOf(block) < 0);
        BlockNoInited.forEach((item) => new Pagination(item));
        return Instances;
    }
}
// Инициашизация;
Pagination.initAllBlocks();

// Экспорт;
window.Block = window.Block ? window.Block : {};
window.Block.Pagination = Pagination;
export default Pagination;
