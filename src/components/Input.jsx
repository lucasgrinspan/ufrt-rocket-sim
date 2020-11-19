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
                            onChange={(e) => onValueChange({ ...values, weight: +e.target.value })}
                            min={0}
                            step={0.1}
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
                            onChange={(e) => onValueChange({ ...values, thrust: +e.target.value })}
                            min={0}
                            step={0.1}
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
                                onValueChange({ ...values, thrustDuration: +e.target.value })
                            }
                            min={0}
                            step={0.1}
                        />{" "}
                        s
                    </div>
                </label>
                <label className="form-group">
                    Wind velocity
                    <div className="with-unit">
                        <input
                            type="number"
                            value={values.wind}
                            onChange={(e) => onValueChange({ ...values, wind: +e.target.value })}
                            min={0}
                            step={0.1}
                        />{" "}
                        m/s
                    </div>
                </label>
                <label className="form-group">
                    Fuselage length
                    <div className="with-unit">
                        <input
                            type="number"
                            value={values.length}
                            onChange={(e) => onValueChange({ ...values, length: +e.target.value })}
                            min={0}
                            step={0.1}
                        />{" "}
                        m
                    </div>
                </label>
                <label className="form-group">
                    Fuselage Diameter
                    <div className="with-unit">
                        <input
                            type="number"
                            value={values.diameter}
                            onChange={(e) =>
                                onValueChange({ ...values, diameter: +e.target.value })
                            }
                            min={0}
                            step={0.001}
                        />{" "}
                        m
                    </div>
                </label>
                <label className="form-group">
                    Fin Span
                    <div className="with-unit">
                        <input
                            type="number"
                            value={values.finSpan}
                            onChange={(e) => onValueChange({ ...values, finSpan: +e.target.value })}
                            min={0}
                            step={0.001}
                        />{" "}
                        m
                    </div>
                </label>
                <label className="form-group">
                    Fin Chord
                    <div className="with-unit">
                        <input
                            type="number"
                            value={values.finChord}
                            onChange={(e) =>
                                onValueChange({ ...values, finChord: +e.target.value })
                            }
                            min={0}
                            step={0.001}
                        />{" "}
                        m
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
