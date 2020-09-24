import React from "react";

const Input = ({}) => {
    return (
        <div>
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

export default Input;
