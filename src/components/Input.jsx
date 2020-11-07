import React from "react";

const Inputs = ({ onPresetSave, values, onValueChange, onCalculate }) => {
    const savePreset = (e) => {
        e.preventDefault();

        onPresetSave(values);
    };

    return (
        <div className="inputs card">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onCalculate();
                }}
            >
                <div className="title-row">
                    <h2>Input</h2>
                    <button className="secondary" type="button" onClick={savePreset}>
                        Add
                    </button>
                </div>
                <label className="form-group">
                    Weight
                    <div className="with-unit">
                        <input
                            type="number"
                            value={values.weight}
                            onChange={(e) => onValueChange({ ...values, weight: e.target.value })}
                            min={0}
                        />{" "}
                        kg
                    </div>
                </label>
                <label className="form-group">
                    Thrust
                    <div className="with-unit">
                        <input
                            type="number"
                            value={values.thrust}
                            onChange={(e) => onValueChange({ ...values, thrust: e.target.value })}
                            min={0}
                        />{" "}
                        N
                    </div>
                </label>
                <label className="form-group">
                    Thrust Duration
                    <div className="with-unit">
                        <input
                            type="number"
                            value={values.thrustDuration}
                            onChange={(e) =>
                                onValueChange({ ...values, thrustDuration: e.target.value })
                            }
                            min={0}
                        />{" "}
                        s
                    </div>
                </label>
                <button className="primary" type="submit">
                    Calculate
                </button>
            </form>
        </div>
    );
};

export default Inputs;
