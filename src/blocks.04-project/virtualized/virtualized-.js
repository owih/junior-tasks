import React from 'react';
import ReactDOM from 'react-dom';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

// Table data as an array of objects
const list = [
    { name: 'Brian Vaughn', description: 'Software engineer', test: 'test' },
    { name: 'Brian Vaughn', description: 'Software engineer' },
    { name: 'Brian Vaughn', description: 'Software engineer' },
    { name: 'Brian Vaughn', description: 'Software engineer' },
    { name: 'Brian Vaughn', description: 'Software engineer' }
    // And so on...
];

// Render your table
ReactDOM.render(
    <Table
        width={300}
        height={100}
        headerHeight={20}
        rowHeight={30}
        rowCount={list.length}
        rowGetter={({ index }) => list[index]}
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
        <Column
            width={200}
            label='test'
            dataKey='test'
        />
    </Table>,
    document.getElementById('root')
);