import React, { useState } from "react";

const Details = ({ data }) => {
    if (!data) {
        return (
            <div className="details card">
                <h2>Details</h2>
            </div>
        );
    }

    const altitudeData = data[0].data.map((a) => a.y);
    const speedData = data[1].data.map((v) => Math.abs(v.y));
    const downrangeData = data[2].data.map((d) => Math.abs(d.x));

    let apogee = 0;
    altitudeData.forEach((altitude) => {
        if (altitude > apogee) {
            apogee = altitude;
        }
    });

    let maxSpeed = 0;
    speedData.forEach((speed) => {
        if (speed > maxSpeed) {
            maxSpeed = speed;
        }
    });

    let distanceTravelled = 0;
    downrangeData.forEach((downrange) => {
        if (downrange > distanceTravelled) {
            distanceTravelled = downrange;
        }
    });

    return (
        <div className="details card">
            <h2>Details</h2>
            <div className="data-container">
                <div className="data-point-container">
                    <p className="data-value">
                        {maxSpeed.toFixed(1)} <span className="data-unit">m/s</span>
                    </p>
                    <p className="data-label">Max Speed</p>
                </div>
                <div className="data-point-container">
                    <p className="data-value">
                        {apogee.toFixed(1)} <span className="data-unit">m</span>
                    </p>
                    <p className="data-label">Apogee</p>
                </div>
                <div className="data-point-container">
                    <p className="data-value">
                        {distanceTravelled.toFixed(1)} <span className="data-unit">m</span>
                    </p>
                    <p className="data-label">Downrange</p>
                </div>
            </div>
        </div>
    );
};

export default Details;
