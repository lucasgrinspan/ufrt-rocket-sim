import React, { useMemo } from "react";
import LineChart from "./Chart/LineChart";
import { ResponsiveLine } from "@nivo/line";

const Graph = ({ data }) => {
    if (data) {
        return (
            <div className="graph">
                <ResponsiveLine
                    data={[data.values[0]]}
                    curve="linear"
                    margin={{ top: 5, bottom: 50, left: 50, right: 10 }}
                    enableGridX={false}
                    enablePoints={false}
                    xScale={{ type: "linear" }}
                    yScale={{ type: "linear" }}
                    lineWidth={3}
                    axisBottom={{
                        orient: "bottom",
                        legend: "Time (s)",
                        legendOffset: 36,
                        legendPosition: "middle",
                        tickValues: 14,
                    }}
                    axisLeft={{
                        orient: "left",
                        legend: "Altitude (m)",
                        legendOffset: -40,
                        legendPosition: "middle",
                    }}
                    isInteractive
                    useMesh
                    enableCrosshair
                    yFormat=" >-.3f"
                    xFormat=" >-.2f"
                    markers={[
                        {
                            axis: "x",
                            value: data.thrustEnd,
                            lineStyle: {
                                stroke: "#b0413e",
                                strokeWidth: 2,
                                strokeDasharray: "5 10",
                            },
                            legend: "Thrust ends",
                            legendOrientation: "horizontal",
                        },
                    ]}
                />
                {/* <LineChart data={data} /> */}
            </div>
        );
    }
    return <div className="graph"></div>;
};

export default Graph;
