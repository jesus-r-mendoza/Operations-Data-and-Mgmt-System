import React from 'react';
import {Dropdown} from 'semantic-ui-react';

const options = [
    {key: 1, text: "Saturn V", value: 1},
    {key: 2, text: "Pic Sat", value: 2}
];

//Pass array of satellite names as props to consolidate API calls
const DropdownComp = ({optionsList}) => (
    <div>
        <Dropdown
            placeholder={"Satellite"}
            selection
            options={optionsList}
        />
    </div>
);

export default DropdownComp;
