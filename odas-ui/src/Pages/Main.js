import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Main extends React.Component {

    render() {
        return(
            <div className={"main-page"}>
                <div>
                    <h1>MAIN PAGE</h1>
                    <img src={require("../Images/front-page.gif")} />
                </div>
            </div>
        );
    }
}