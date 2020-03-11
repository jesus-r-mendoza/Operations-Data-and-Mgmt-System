import React from 'react';
// Components
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Spinner } from "react-bootstrap";
// Stylesheets
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import "../Layout/Sidebar.css"
import "../Layout/Utilities.css"

initializeIcons("https://static2.sharepointonline.com/files/fabric/assets/icons/");

const CheckComponent = ({ labels, isLoading, checked, onCheckboxChange }) => {
    if(isLoading) {
        return (
            <div className={"loading-spinner"}>
                <Spinner
                    as={"div"}
                    animation={"border"}
                    role={"status"}
                />
            </div>
        )
    } else {
        return labels.map((label) => {
            return (
                <div className={"check-selections"} key={label.id}>
                    <label className={"checkbox-label"}>
                        <Checkbox
                            id={label.id}
                            name={label.name}
                            type={"checkbox"}
                            checked={checked.get(label.id)}
                            onChange={onCheckboxChange}
                        />
                        {label.name}
                    </label>
                </div>
            )
        });
    }
};

export default CheckComponent;