import React from "react";
import PropTypes from 'prop-types';
import Utils from './Utils';
import {Column, Table, List, AutoSizer, Grid, ScrollSync} from "react-virtualized";
import "react-virtualized/styles.css";


class App extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this._cellHeaderRenderer = this._cellHeaderRenderer.bind(this);
        this._cellBodyRenderer = this._cellBodyRenderer.bind(this);
        this.state = {
            rowHeightBase: 100,
            rowHeightHeader: 50,
            showKeys: Object.keys(
                this.props.data
                    .map((row) => Object.keys(row))
                    .reduce((res, cur) => {
                        cur.forEach((key) => {
                            res[key] = '';
                        });
                        return res;
                    }, {})),
        };
    }
    render() {
        const {showKeys, rowHeightBase, rowHeightHeader} = this.state;
        return (
            <ScrollSync>
                {({
                    clientHeight,
                    clientWidth,
                    onScroll,
                    scrollHeight,
                    scrollLeft,
                    scrollTop,
                    scrollWidth,
                }) => (
                    <AutoSizer disableHeight>
                        {({width}) => (
                            <div>
                                <Grid
                                    className={this.props.cn['HEADER']}
                                    width={width}
                                    height={rowHeightHeader}
                                    scrollLeft={scrollLeft}
                                    onScroll={onScroll}
                                    columnCount={showKeys.length}
                                    columnWidth={(width  - Utils.getScrollBarSize()) / showKeys.length}
                                    rowCount={1}
                                    rowHeight={rowHeightHeader}
                                    cellRenderer={this._cellHeaderRenderer}
                                />
                                <Grid
                                    className={this.props.cn['BODY']}
                                    width={width}
                                    height={this.props.height - rowHeightBase}
                                    scrollLeft={scrollLeft}
                                    onScroll={onScroll}
                                    columnCount={showKeys.length}
                                    columnWidth={(width  - Utils.getScrollBarSize()) / showKeys.length}
                                    rowCount={this.props.data.length}
                                    rowHeight={rowHeightBase}
                                    cellRenderer={this._cellBodyRenderer}
                                />
                            </div>
                        )}
                    </AutoSizer>
                )}
            </ScrollSync>
        );
    }
    _cellHeaderRenderer({columnIndex, key, rowIndex, style}) {
        let keys = Object.keys(this.props.data[rowIndex]);
        let content = keys[columnIndex];
        return (
            <div key={key} style={style} className={this.props.cn['CELL']}>
                {content}
            </div>
        );
    }
    _cellBodyRenderer({columnIndex, key, rowIndex, style}) {
        let keys = Object.keys(this.props.data[rowIndex]);
        let content = this.props.data[rowIndex][keys[columnIndex]];
        return (
            <div key={key} style={style} className={this.props.cn['CELL']}>
                {content}
            </div>
        );
    }
}
App.propTypes = {
    id: PropTypes.string,
    url: PropTypes.string,
    data: PropTypes.array,
    cn: PropTypes.object,
    height: PropTypes.number,
};
export default App;