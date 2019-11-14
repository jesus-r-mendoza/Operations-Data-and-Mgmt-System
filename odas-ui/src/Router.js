import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
// Components
import Header from "./Components/Header";
import Main from "./Pages/Main";
import QueryData from "./Pages/QueryData";
import GenerateData from "./Pages/GenerateData";
import UploadData from "./Pages/UploadData";
import Documentation from "./Pages/Documentation";
// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout/Main.css";
import AnalysisSummary from "./Pages/AnalysisSummary";

// TODO object is currently useless
const routes = [
    {
        path: "/query",
        component: QueryData,
        routes: [
            {
                path: "/query/report"
            }
        ]
    },
    {
        path: "/upload",
        component: UploadData,
        routes: [
            {
                path: "/upload/report",
                component: UploadData
            }
        ]
    },
];

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Header />
                <div>
                    <Route path={"/"} exact component={Main} />
                    <Route path={"/query"} component={QueryData} />
                    <Route path={"/generate"} component={GenerateData} />
                    <Route path={"/upload"} component={UploadData} />
                    <Route path={"/documentation"} component={Documentation} />
                    <Route path={"/summary"} component={AnalysisSummary} />
                </div>
            </Router>
        );
    }
}