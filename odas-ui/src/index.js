import React from "react";
import ReactDOM from "react-dom";
import App from "./Router"
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reducers from "./Reducers"
import thunk from "redux-thunk";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);