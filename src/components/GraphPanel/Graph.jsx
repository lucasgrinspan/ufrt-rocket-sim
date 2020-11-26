import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import Graph3D from "./Graph3D";

const Graph = ({ data }) => {
    if (data) {
        return (
            <div className="graph">
                {data.id !== "Trajectory" ? ( // show 3d for trajectory
                    <ResponsiveLine
                        data={[data]}
                        curve="cardinal"
                        type="point"
                        margin={{ top: 15, bottom: 50, left: 50, right: 10 }}
                        enableGridX={false}
                        enablePoints={false}
                        xScale={{ type: "linear", min: "auto", max: "auto" }}
                        yScale={{ type: "linear", min: "auto", max: "auto" }}
                        lineWidth={3}
                        axisBottom={{
                            orient: "bottom",
                            legend: data.axisBottom,
                            legendOffset: 36,
                            legendPosition: "middle",
                            tickValues: 14,
                        }}
                        axisLeft={{
                            orient: "left",
                            legend: data.axisLeft,
                            legendOffset: -40,
                            legendPosition: "middle",
                        }}
                        isInteractive
                        useMesh
                        enableCrosshair
                        yFormat=" >-.3f"
                        xFormat=" >-.2f"
                        markers={
                            data.thrustEnd && [
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
                            ]
                        }
                    />
                ) : (
                    <Graph3D data={data} />
                )}
            </div>
        );
    }
    return <div className="graph"></div>;
};

export default Graph;
