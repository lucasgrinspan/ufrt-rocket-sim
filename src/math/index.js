import ode45 from "ode45-cash-karp";
import funcGenerator from "./trajectoryWithWind";

export default (wind, weight, thrust, thrustDuration, length, diameter, finSpan, finChord) => {
    let data = [
        { id: "Altitude", data: [], axisBottom: "Time (s)", axisLeft: "Altitude (m)" },
        { id: "Velocity", data: [], axisBottom: "Time (s)", axisLeft: "Velocity (m/s)" },
        { id: "Downrange", data: [], axisBottom: "Downrange (m)", axisLeft: "Altitude (m)" },
        {
            id: "Trajectory",
            data: { x: [], y: [], z: [], type: "scatter3d", mode: "lines" },
            axisBottom: "Downrange (m)",
            axisLeft: "Altitude (m)",
        },
    ];

    let y0 = [0, 0, 0, 0, Math.PI / 2, 0];
    let t0 = 0;
    let dt = 0.0001;
    let integrator = ode45(
        y0,
        funcGenerator(wind, weight, thrust, thrustDuration, length, diameter, finSpan, finChord),
        t0,
        dt
    );

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
            data[3].data.y.push(integrator.t);
            data[3].data.x.push(integrator.y[0]);
            data[3].data.z.push(-1 * integrator.y[1]);
        }
    }

    // reverse the down range data
    data[2].data.reverse();

    return data;
};
