import React from 'react';
import ReactDOM from 'react-dom';
import {Column, Table, AutoSizer} from 'react-virtualized';
import 'react-virtualized/styles.css';
const Instances = [];
const ClassName = {
    BLOCK: 'virtualized',
};
class Virtualized {
    constructor(elem) {
        Instances.push(this);
        this.block = elem;
        // Компанент
    }
    static getAllInstances() {
        return Instances;
    }
    static getAllBlocks() {
        return Array.from(document.getElementsByClassName(ClassName.BLOCK));
    }
    static initAllBlocks() {
        let Instances = Virtualized.getAllInstances();
        let Blocks = Virtualized.getAllBlocks();
        let BlocksInited = Instances.map((ins) => ins.block);
        let BlockNoInited = Blocks.filter((block) => BlocksInited.indexOf(block) < 0);
        BlockNoInited.forEach((item) => new Virtualized(item));
        return Instances;
    }
}
// Инициашизация;
Virtualized.initAllBlocks();

// Экспорт;
window.Block = window.Block ? window.Block : {};
window.Block.Virtualized = Virtualized;
export default Virtualized;