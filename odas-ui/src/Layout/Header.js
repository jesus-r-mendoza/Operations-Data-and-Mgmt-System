import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h2>{this.props.children}</h2>
        )
    }
}

export default Header;
