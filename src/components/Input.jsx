import React from "react";

const Inputs = ({}) => {
    return (
        <div className="inputs card">
            <div className="title-row">
                <h2>Input</h2>
                <button className="primary">Add</button>
            </div>
            <label className="form-group">
                Size
                <div className="with-unit">
                    <input type="number" /> m
                </div>
            </label>
            <label className="form-group">
                Weight
                <div className="with-unit">
                    <input type="number" /> kg
                </div>
            </label>
        </div>
    );
};

export default Inputs;
