const trajectory = require("./trajectoryWithWind");
const ode45 = require("ode45-cash-karp");

let data = [
    { id: "Position", data: [] },
    { id: "Velocity", data: [] },
];

let y0 = [0, 0, 0, 0, Math.PI / 2, 0];
let t0 = 0;
let dt = 0.0001;
let integrator = ode45(y0, trajectory(), t0, dt);

let tmax = 12;

let apogee = 0;

while (integrator.step(tmax)) {
    if (integrator.y[1] < apogee) {
        apogee = integrator.y[1];
    }
}
console.log(apogee * -1);
