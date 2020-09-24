import React, { Component } from "react";
import "./App.css";
import Input from "./components/Input";
import Graph from "./components/Graph";

class App extends Component {
    render() {
        return (
            <div>
                <h1>Rocket Simulator</h1>
                <div className="main">
                    <Graph></Graph>
                    <Input></Input>
                </div>
            </div>
        );
    }
}

export default App;
