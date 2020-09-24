import React from "react";

const EmptyListComponent = () => (
    <div style={{ textAlign: "center", width: "100%", marginTop: 10, marginBottom: 10 }}>
        <p>Save some simulations with the green button</p>
    </div>
);

const Simulations = () => {
    return (
        <div className="simulations card">
            <h2>Simulations</h2>
            <EmptyListComponent />
        </div>
    );
};

export default Simulations;
