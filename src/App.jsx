import React, { useEffect, useState } from "react";
import "./App.css";
import Inputs from "./components/Input";
import Graph from "./components/Graph";
import Simulations from "./components/Simulations";
import solveTrajectory from "./math/index";

const App = () => {
    const initialValues = {
        weight: 25,
        thrust: 300,
        thrustDuration: 1,
    };
    const [data, setData] = useState(undefined);
    const [presets, setPresets] = useState([]);
    const [values, setValues] = useState(initialValues);

    const calculate = (v) => {
        if (v) {
            const data = solveTrajectory(v.weight, v.thrust, v.thrustDuration);
            setData(data);
        } else {
            const data = solveTrajectory(values.weight, values.thrust, values.thrustDuration);
            setData(data);
        }
    };

    useEffect(() => calculate(), []);

    return (
        <div className="container">
            <h1>Rocket Simulator</h1>
            <div className="main">
                <Graph data={data}></Graph>
                <Inputs
                    onPresetSave={(d) => setPresets([...presets, d])}
                    values={values}
                    onValueChange={(v) => setValues(v)}
                    onCalculate={calculate}
                ></Inputs>
                <Simulations
                    presets={presets}
                    loadPreset={(preset) => {
                        setValues(preset);
                        calculate(preset);
                    }}
                ></Simulations>
            </div>
        </div>
    );
};

export default App;
