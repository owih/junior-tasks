import React from "react";
import ReactDOM from "react-dom";
import App from './components/App';

const Instances = [];
const ClassName = {
    BLOCK: 'spreadsheet',
    HEADER: 'spreadsheet__header',
    BODY: 'spreadsheet__body',
    CELL: 'spreadsheet__cell',
};
class Spreadsheet {
    constructor(elem, props) {
        Instances.push(this);
        // Bind functions;
        this.render = this.render.bind(this);
        this.getData = this.getData.bind(this);

        this.block = elem;
        this.url = this.block.dataset['url'];
        this.data = [];
        this.getData(this.render);
    }
    render() {
        ReactDOM.render(
            React.createElement(App, {
                id: this.block.id,
                url: this.url,
                data: this.data,
                cn: ClassName,
                height: this.block.offsetHeight || 300,
            }),
            this.block
        );
    }
    getData(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.url, true);
        xhr.responseType = 'json';
        xhr.onload = () => {
            var status = xhr.status;
            if (status === 200) {
                this.data = xhr.response;
                callback();
            } else {
                console.warn(status, xhr.response);
            }
        };
        xhr.send();
    }
    static getAllInstances() {
        return Instances;
    }

    static getAllBlocks() {
        return Array.from(document.getElementsByClassName(ClassName.BLOCK));
    }

    static initAllBlocks() {
        let Instances = Spreadsheet.getAllInstances();
        let Blocks = Spreadsheet.getAllBlocks();
        let BlocksInited = Instances.map((ins) => ins.block);
        let BlockNoInited = Blocks.filter((block) => BlocksInited.indexOf(block) < 0);
        BlockNoInited.forEach((item) => new Spreadsheet(item));
        return Instances;
    }
}
// Инициашизация;
Spreadsheet.initAllBlocks();

// Экспорт;
window.Block = window.Block ? window.Block : {};
window.Block.Spreadsheet = Spreadsheet;
export default Spreadsheet;