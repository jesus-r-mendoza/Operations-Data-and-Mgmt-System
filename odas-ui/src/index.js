import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Header from "./Layout/Header";
import Main from "./Pages/Main";
import AboutPage from "./Pages/AboutPage";
import QueryData from "./Pages/QueryData";
import GenerateData from "./Pages/GenerateData";
import UploadData from "./Pages/UploadData";
import {Container} from "react-bootstrap";

// TODO consider putting the router in its own file
// TODO Consider turning into a nested route
class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Header />
                    <div id={"Paths container"}>
                        <Route path={"/main"} exact component={Main} />
                        <Route path={"/about"} component={AboutPage} />
                        <Route path={"/query"} component={QueryData} />
                        <Route path={"/generate"} component={GenerateData} />
                        <Route path={"/upload"} component={UploadData} />
                    </div>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));