import React from "react";
import ReactDOM from "react-dom";
import App from "./Router"
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./Reducers"

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <App />,
    </Provider>,
    document.querySelector("#root")
);