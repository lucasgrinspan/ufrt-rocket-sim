const trajectory = require("./testTrajectory");
const ode45 = require("ode45-cash-karp");
const rk4 = require("ode-rk4");
const euler = require("ode-euler");

const execution = (alg, dt) => {
    for (let i = 0; i < 1000; i++) {
        let y0 = [0, 0, 0, 0, Math.PI / 2, 0];
        let t0 = 0;
        let integrator = alg(y0, trajectory(), t0, dt);

        let tmax = 12;

        var apogee = 0;

        while (true) {
            integrator.step();
            let altitude = integrator.y[1] * -1;
            if (altitude >= apogee) {
                apogee = altitude;
            }
            if (integrator.t >= tmax) {
                break;
            }
        }
    }
    console.log(apogee);
};

console.time("cash-karp");
execution(ode45, 0.1);
console.timeEnd("cash-karp");

console.time("rk4");
execution(rk4, 0.1);
console.timeEnd("rk4");

console.time("euler");
execution(euler, 0.1);
console.timeEnd("euler");
