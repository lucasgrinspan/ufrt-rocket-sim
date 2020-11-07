import React from "react";

const EmptyListComponent = () => (
    <div style={{ textAlign: "center", width: "100%", marginTop: 10, marginBottom: 10 }}>
        <p>Save some simulations by clicking "Add"</p>
    </div>
);

const Simulations = ({ presets, loadPreset }) => {
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
                                </p>
                                <button
                                    type="button"
                                    className="primary"
                                    onClick={() => loadPreset(preset)}
                                >
                                    Load
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Simulations;
