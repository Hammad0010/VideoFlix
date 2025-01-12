import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MainView } from "./components/main-view/main-view";
import "./App.scss";

function App() {
    return (
        <BrowserRouter>
            <MainView />
        </BrowserRouter>
    );
}

export default App; 