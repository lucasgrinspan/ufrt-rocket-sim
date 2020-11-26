import React, { useEffect, useState } from "react";
import "./App.css";
import Inputs from "./components/Input";
import Simulations from "./components/Simulations";
import GraphPanel from "./components/GraphPanel/GraphPanel";
import solveTrajectory from "./math/index";
import { deletePreset, getPresets, savePreset } from "./local";

const App = () => {
    const initialValues = {
        weight: 1,
        thrust: 300,
        thrustDuration: 1,
        wind: 0,
        length: 1.5,
        diameter: 0.038,
        finSpan: 0.02,
        finChord: 0.2,
    };
    const [data, setData] = useState(undefined);
    const [presets, setPresets] = useState([]);
    const [values, setValues] = useState(initialValues);

    const addPreset = (preset) => {
        setPresets([...presets, preset]);
        savePreset(preset);
    };

    const removePreset = (index) => {
        let newPresets = presets.filter((v, i) => {
            return i !== index;
        });
        deletePreset(index);

        setPresets(newPresets);
    };

    const calculate = (v) => {
        if (v) {
            const data = solveTrajectory(
                v.wind,
                v.weight,
                v.thrust,
                v.thrustDuration,
                v.length,
                v.diameter,
                v.finSpan,
                v.finChord
            );
            setData(data);
        } else {
            const data = solveTrajectory(
                values.wind,
                values.weight,
                values.thrust,
                values.thrustDuration,
                values.length,
                values.diameter,
                values.finSpan,
                values.finChord
            );
            setData(data);
        }
    };

    useEffect(() => {
        calculate();
        setPresets(getPresets());
    }, []);

    return (
        <div className="container">
            <h1>Rocket Simulator</h1>
            <div className="main">
                <GraphPanel data={data} />
                <Inputs
                    onPresetSave={addPreset}
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
                    deletePreset={removePreset}
                ></Simulations>
            </div>
        </div>
    );
};

export default App;
