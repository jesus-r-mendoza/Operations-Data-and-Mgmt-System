import React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

import "../Layout/Sidebar.css"

const CheckComponent = ({ label, isSelected, onCheckboxChange }) => (
    <div className={"check-selections"}>
        <label className={"checkbox-label"}>
                <Checkbox
                    type={"checkbox"}
                    name={label}
                    checked={isSelected}
                    onChange={onCheckboxChange}
                />
            {label}
        </label>
    </div>
);

export default CheckComponent;