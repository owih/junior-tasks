import prettyHtml from 'json-pretty-html';
const Instances = [];
const ClassName = {
    BLOCK: 'example',
    SCHEMA: 'example__schema',
};
class Example {
    constructor(elem) {
        Instances.push(this);
        this.block = elem;
        this.schema = this.block.getElementsByClassName(ClassName.SCHEMA);
        this.renderAllSchemas();
    }
    renderAllSchemas() {
        Array.from(this.schema).forEach((elem) => {
            elem.innerHTML = prettyHtml(JSON.parse(elem.innerText));
        });
    }
    static getAllInstances() {
        return Instances;
    }
    static getAllBlocks() {
        return Array.from(document.getElementsByClassName(ClassName.BLOCK));
    }
    static initAllBlocks() {
        let Instances = Example.getAllInstances();
        let Blocks = Example.getAllBlocks();
        let BlocksInited = Instances.map((ins) => ins.block);
        let BlockNoInited = Blocks.filter((block) => BlocksInited.indexOf(block) < 0);
        BlockNoInited.forEach((item) => new Example(item));
        return Instances;
    }
}
// Инициашизация;
Example.initAllBlocks();

// Экспорт;
window.Block = window.Block ? window.Block : {};
window.Block.Example = Example;
export default Example;
