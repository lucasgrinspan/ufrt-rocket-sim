import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const Graph3D = ({ data }) => {
    const [Plot3D, setPlot3D] = useState(
        <div className="loading-text">
            <p>Loading...</p>
        </div>
    );

    useEffect(() => {
        setPlot3D(
            <Plot
                data={[data.data]}
                layout={{
                    margin: {
                        l: 0,
                        r: 0,
                        t: 0,
                        b: 0,
                    },
                    scene: {
                        xaxis: {
                            title: { text: "Downrange (m)" },
                        },
                        yaxis: {
                            title: { text: "Time (s)" },
                        },
                        zaxis: {
                            title: { text: "Altitude (m)" },
                        },
                    },
                }}
                config={{ displayModeBar: false, responsive: true }}
                style={{ width: "100%", height: "100%" }}
                useResizeHandler={true}
            />
        );
    }, [data]);
    return Plot3D;
};

export default Graph3D;
