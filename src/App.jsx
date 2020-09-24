import React, { Component } from "react";
import "./App.css";
import Inputs from "./components/Input";
import Graph from "./components/Graph";
import Simulations from "./components/Simulations";

class App extends Component {
    render() {
        return (
            <div>
                <h1>Rocket Simulator</h1>
                <div className="main">
                    <Graph></Graph>
                    <Inputs></Inputs>
                    <Simulations></Simulations>
                </div>
            </div>
        );
    }
}

export default App;
