import React from "react";

const EmptyListComponent = () => (
    <div style={{ textAlign: "center", width: "100%", marginTop: 10, marginBottom: 10 }}>
        <p>Save some simulations by clicking "Add"</p>
    </div>
);

const Simulations = ({ presets, loadPreset, deletePreset }) => {
    return (
        <div className="simulations card">
            <h2>Simulations</h2>
            {presets.length === 0 ? (
                <EmptyListComponent />
            ) : (
                <div className="presets-container">
                    {presets.map((preset, index) => {
                        return (
                            <div className="preset" key={index}>
                                <p>
                                    W: <span className="preset-value">{preset.weight}</span>
                                    T: <span className="preset-value">{preset.thrust}</span>
                                    ΔT:{" "}
                                    <span className="preset-value">{preset.thrustDuration}</span>
                                    v: <span className="preset-value">{preset.wind}</span>
                                    FL: <span className="preset-value">{preset.length}</span>
                                    FD: <span className="preset-value">{preset.diameter}</span>
                                    FS: <span className="preset-value">{preset.finSpan}</span>
                                    FC: <span className="preset-value">{preset.finChord}</span>
                                </p>
                                <div className="button-container">
                                    <button className="danger" onClick={() => deletePreset(index)}>
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="primary"
                                        onClick={() => loadPreset(preset)}
                                    >
                                        Load
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Simulations;
