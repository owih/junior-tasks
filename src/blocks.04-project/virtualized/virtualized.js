import React from "react";
import ReactDOM from "react-dom";
import {Column, Table, List, AutoSizer} from "react-virtualized";
import "react-virtualized/styles.css";
const Instances = [];
const ClassName = {
    BLOCK: 'virtualized',
};
class Virtualized {
    constructor(elem, data, props) {
        Instances.push(this);
        this.block = elem;
        this.data = data;
        this.data = new Array(100).fill({ name: 'Brian Vaughn', description: 'Software engineer' }); // TODO: убрать
        this.props = {...props};
        // Компанент

        ReactDOM.render(
            <AutoSizer disableHeight>
                {({width}) => (
                    <Table
                        width={width}
                        height={300}
                        headerHeight={20}
                        rowHeight={30}
                        rowCount={this.data.length}
                        rowGetter={({index}) => this.data[index]}
                    >
                        <Column
                            label='Name'
                            dataKey='name'
                            width={100}
                        />
                        <Column
                            width={200}
                            label='Description'
                            dataKey='description'
                        />
                    </Table>
                )}
            </AutoSizer>,
            this.block
        );
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