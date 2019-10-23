import React from 'react';
import {Checkbox} from "office-ui-fabric-react";

const Checkboxdisplay = ({label, isSelected, onCheckboxChange}) => (
    <div className={"checkbox-container"}>
        <Checkbox
            type={"checkbox"}
            label={label}
            checked={isSelected}
            onChange={onCheckboxChange}
        />
    </div>
);

export default Checkboxdisplay;