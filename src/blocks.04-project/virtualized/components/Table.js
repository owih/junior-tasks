import React from 'react';
class Table extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {value: 0};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        console.dir(this.nameTextField.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input ref={(el) => this.nameTextField = el} />
            </form>
        );
    }
}
export default Table;
