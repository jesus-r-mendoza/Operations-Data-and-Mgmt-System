import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
// Components
import Header from "./Components/Header";
import Main from "./Pages/Main";
import QueryData from "./Pages/QueryData";
import UploadData from "./Pages/UploadData";
import Documentation from "./Pages/Documentation";
// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout/Main.css";
import Dashboard from "./Pages/Dashboard";

// TODO object is currently useless
// const routes = [
//     {
//         path: "/query",
//         component: QueryData,
//         routes: [
//             {
//                 path: "/query/report"
//             }
//         ]
//     },
//     {
//         path: "/upload",
//         component: UploadData,
//         routes: [
//             {
//                 path: "/upload/report",
//                 component: UploadData
//             }
//         ]
//     },
// ];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            satObject: [],
            MEASUREMENTS: [],
            COMPONENTS: []
        }
    }

    render() {
        return (
            <Router>
                <Header />
                <div>
                    <Route path={"/"} exact component={Main} />
                    <Route path={"/query"} component={QueryData} />
                    <Route path={"/upload"} component={UploadData} />
                    <Route path={"/documentation"} component={Documentation} />
                    <Route path={"/user-dashboard"} component={Dashboard} />
                </div>
            </Router>
        );
    }
}