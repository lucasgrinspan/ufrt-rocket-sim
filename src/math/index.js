import ode45 from "ode45-cash-karp";
import funcGenerator from "./trajectoryWithWind";

export default (weight, thrust, thrustDuration) => {
    let data = [
        { id: "Altitude", data: [] },
        { id: "Velocity", data: [] },
        { id: "Downrange", data: [] },
    ];

    let y0 = [0, 0, 0, 0, Math.PI / 2, 0];
    let t0 = 0;
    let dt = 0.0001;
    let integrator = ode45(y0, funcGenerator(), t0, dt);

    let tmax = 12;
    let counter = 0;

    let numSteps = tmax / dt;
    let numPoints = Math.floor(numSteps / 50);

    while (integrator.step(tmax)) {
        integrator.dt = dt;
        if (counter++ % numPoints === 0) {
            data[0].data.push({ x: integrator.t, y: -1 * integrator.y[1] });
            data[1].data.push({ x: integrator.t, y: integrator.y[2] });
            data[2].data.push({ x: integrator.y[0], y: -1 * integrator.y[1] });
        }
    }
    return data;
};
