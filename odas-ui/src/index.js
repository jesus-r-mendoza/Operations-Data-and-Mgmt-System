import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Layout/Header';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            //page container
            <div>
                {/*header container*/}
                    <Header>Operations Data and Management System</Header>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));