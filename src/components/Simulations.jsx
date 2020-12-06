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
                                <div>
                                    <div className="preset-value-container">
                                        W: <span className="preset-value">{preset.weight}</span>
                                    </div>
                                    <div className="preset-value-container">
                                        T: <span className="preset-value">{preset.thrust}</span>
                                    </div>
                                    <div className="preset-value-container">
                                        ΔT:{" "}
                                        <span className="preset-value">
                                            {preset.thrustDuration}
                                        </span>
                                    </div>
                                    <div className="preset-value-container">
                                        v: <span className="preset-value">{preset.wind}</span>
                                    </div>
                                    <div className="preset-value-container">
                                        FL: <span className="preset-value">{preset.length}</span>
                                    </div>
                                    <div className="preset-value-container">
                                        FD: <span className="preset-value">{preset.diameter}</span>
                                    </div>
                                    <div className="preset-value-container">
                                        FS: <span className="preset-value">{preset.finSpan}</span>
                                    </div>
                                    <div className="preset-value-container">
                                        FC: <span className="preset-value">{preset.finChord}</span>
                                    </div>
                                </div>
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
