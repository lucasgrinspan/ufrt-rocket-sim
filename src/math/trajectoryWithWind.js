export default (
    wind = 0,
    payloadMass = 0,
    thrust = 300,
    burnout = 1,
    length = 1.5,
    diameter = 0.038,
    finSpan = 0.02,
    finChord = 0.2
) => {
    return (dydt, y, t) => {
        // let wind = 0; // wind speed (m/s)
        // let payloadMass = 0; // payload mass (kg)
        // let length = 1.5; // fuselage length (m)
        // let diameter = 0.038; // fuselage diameter (m)
        // let thrust = 300; // thrust (N)
        // let burnout = 1; // duration of thrust (s)
        // let finSpan = 0.02; // span of fin (m)
        // let finChord = 0.2; // chord of fin (m)

        // constants
        const g = 9.8; // gravity
        const rho = 1.225; // air density
        const xcp = length - 0.3; // distance from nose to center of pressure
        const xcg = 0.8; // distance from nose to center of gravity
        const I = 2000; // moment of inertia
        const fuselageThickness = 0.002; // thickness (m) of fuselage

        const motorMass = 0.293;
        const elecMass = 1.0;
        const parachuteMass = 0.5;
        const noseConeMass = 0.6;
        const ballastMass = 0.0;
        const fuselageRho = 1250; // kg/m
        const finRho = 1800; // kg/m^3

        // coefficients of lift and drag in degrees
        const fusCL = 0;
        const fusCLa = 0;
        const fusCD = 0.7;
        const fusCDa = 0.1;

        const finCLa0 = 0.0; // CL constant
        const finCLa1 = 0.1328; // CL linear
        const finCLa2 = 0.0; // CL quadratic
        const finCLa3 = -0.0002; // CL cubic

        const finCDa0 = 0.002; // CD constant
        const finCDa1 = 0.0; // CD linear
        const finCDa2 = 0.0002; // CD quadratic
        const finCDa3 = 0.0; // CD cubic

        // calculate approximate thickness of airfoil
        const finThickness = finChord / 6;

        // compute mass of fins and fuselage
        const fuselageMass =
            fuselageRho *
            Math.PI *
            (Math.pow(diameter, 2) - Math.pow(diameter - fuselageThickness, 2)) *
            length;
        const finMass = finRho * (finSpan * finChord * finThickness);

        // compute reference area for fuselage
        const fuselageArea = Math.PI * Math.pow(diameter / 2, 2);

        // compute reference area for fin
        const finArea = finSpan * finChord;

        // compute body axis velocities
        const u = y[2] + wind * Math.cos(y[4]);
        const w = y[3] + wind * Math.sin(y[4]);

        // compute total velocity
        const V = Math.sqrt(Math.pow(u, 2) + Math.pow(w, 2));

        // compute angle of attack
        let alpha = 0;
        if (u !== 0) {
            alpha = Math.atan(w / u);
        }

        let lift;
        let drag;
        // compute lift and drag at this velocity and angle of attack
        if (Math.abs((alpha * 180) / Math.PI) <= 20.0) {
            // compute lift using fin aerodynamics
            lift =
                0.5 *
                rho *
                Math.pow(V, 2) *
                (fuselageArea * (fusCL + fusCLa * ((alpha * 180) / Math.PI)) +
                    finArea *
                        (Math.pow(finCLa0 * ((alpha * 180) / Math.PI), 0) +
                            Math.pow(finCLa1 * ((alpha * 180) / Math.PI), 1) +
                            Math.pow(finCLa2 * ((alpha * 180) / Math.PI), 2) +
                            Math.pow(finCLa3 * ((alpha * 180) / Math.PI), 3)));

            drag =
                0.5 *
                rho *
                Math.pow(V, 2) *
                (fuselageArea * (fusCD + fusCDa * Math.pow((alpha * 180) / Math.PI, 2)) +
                    finArea *
                        (Math.pow(finCDa0 * ((alpha * 180) / Math.PI), 0) +
                            Math.pow(finCDa1 * ((alpha * 180) / Math.PI), 1) +
                            Math.pow(finCDa2 * ((alpha * 180) / Math.PI), 2) +
                            Math.pow(finCDa3 * ((alpha * 180) / Math.PI), 3)));
        } else {
            // compute lift but ignore fins due to stall
            lift =
                0.5 *
                rho *
                Math.pow(V, 2) *
                (fuselageArea * (fusCL + fusCLa * ((alpha * 180) / Math.PI)));

            // compute drag but assume fins act like fuselage due to stall
            drag =
                0.5 *
                rho *
                Math.pow(V, 2) *
                ((fuselageArea + finArea) *
                    (fusCD + fusCDa * Math.pow((alpha * 180) / Math.PI, 2)));
        }

        // generate thr thrust and mass of propellant
        let T = 0;
        if (t < burnout) {
            T = thrust;
        }

        // generate weight
        const totalMass =
            motorMass +
            elecMass +
            parachuteMass +
            noseConeMass +
            ballastMass +
            fuselageMass +
            finMass +
            payloadMass;

        const W = totalMass * g;

        // end simulation if we've hit the ground already
        if (y[1] > 1) {
            dydt[0] = 0;
            dydt[1] = 0;
            dydt[2] = 0;
            dydt[3] = 0;
            dydt[4] = 0;
            dydt[5] = 0;
        } else {
            dydt[0] = y[2] * Math.cos(y[4]) + y[3] * Math.sin(y[4]);
            dydt[1] = -1 * y[2] * Math.sin(y[4]) + y[3] * Math.cos(y[4]);
            dydt[2] =
                (-1 * W * Math.sin(y[4]) + T + lift * Math.sin(alpha) - drag * Math.cos(alpha)) /
                totalMass;
            dydt[3] =
                (W * Math.cos(y[4]) - lift * Math.cos(alpha) - drag * Math.sin(alpha)) / totalMass;
            dydt[4] = y[5];
            dydt[5] = (-1 * (xcp - xcg) * (lift * Math.cos(alpha) + drag * Math.sin(alpha))) / I;
        }
    };
};
