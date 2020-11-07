export default (
    weight = 25.215,
    thrust = 300,
    thrustDuration = 1.0,
    finSpan = 0.02,
    finChord = 0.2
) => {
    return (dydt, y, t) => {
        const S = finSpan * finChord;

        const D = 0.6125 * Math.pow(y[1], 2) * (S * 0.002 + 0.0079);

        const T = t < thrustDuration ? thrust : 0.0;

        dydt[0] = y[1];
        dydt[1] = (T - weight - D) / 2.5;
    };
};
