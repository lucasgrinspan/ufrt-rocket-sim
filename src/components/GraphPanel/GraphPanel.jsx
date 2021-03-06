import React, { useState } from "react";
import Graph from "./Graph";

const GraphPanel = ({ data }) => {
    const [selectedGraph, setSelectedGraph] = useState(0);

    let selectedData;
    if (data) {
        selectedData = data[selectedGraph];
    }
    return (
        <div className="graph-container" id="graph-panel">
            <div className="tabs">
                {data &&
                    data.map((series, index) => {
                        return (
                            <button
                                key={series.id}
                                className={index === selectedGraph ? "active" : ""}
                                onClick={() => setSelectedGraph(index)}
                            >
                                {series.id}
                            </button>
                        );
                    })}
            </div>
            <div>
                <Graph data={selectedData} />
            </div>
        </div>
    );
};

export default GraphPanel;
