import React from 'react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import "../Layout/Sidebar.css"

initializeIcons("https://static2.sharepointonline.com/files/fabric/assets/icons/");

const CheckComponent = ({ labels, isSelected, onCheckboxChange }) => {
    // console.log(labels);
    return labels.map((label) => {
        return (
            <div className={"check-selections"} key={label}>
                <label className={"checkbox-label"} >
                    <Checkbox
                        type={"checkbox"}
                        name={label}
                        checked={isSelected}
                        onChange={onCheckboxChange}
                    />
                    {label}
                </label>
            </div>
        )
    });
};

export default CheckComponent;