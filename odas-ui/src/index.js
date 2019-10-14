import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
// Components
import Header from "./Layout/Header";
import Main from "./Pages/Main";
import QueryData from "./Pages/QueryData";
import GenerateData from "./Pages/GenerateData";
import UploadData from "./Pages/UploadData";
// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout/Main.css";

// TODO consider putting the router in its own file
// TODO Consider turning into a nested route
// TODO Reuse QueryData in GenerateData
class App extends React.Component {
    render() {
        return (
            <Router>
                <Header />
                <div>
                    <Route path={"/"} exact component={Main} />
                    <Route path={"/query"} component={QueryData} />
                    <Route path={"/generate"} component={GenerateData} />
                    <Route path={"/upload"} component={UploadData} />
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));