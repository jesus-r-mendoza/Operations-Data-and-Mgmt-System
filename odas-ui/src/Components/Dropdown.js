import React from 'react';
import {Dropdown} from 'semantic-ui-react';

//Pass array of satellite names as props to consolidate API calls
export default class DropdownComp extends React.Component {
    render() {
        return (
            <Dropdown
                placeholder={"Satellite"}
                selection options={this.props.children} />
        );
    }
}