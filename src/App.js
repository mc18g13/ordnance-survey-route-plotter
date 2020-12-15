import React from "react";
import { ReactBingmaps } from 'react-bingmaps';

function App() {
  return (
    <ReactBingmaps 
        bingmapKey = "AqTBoR7ee9aqB1014xgKQ-3EXp-kv8r3InQ2OcxxxuU81xMHybJkxfsih687H2KC"
        center={[51.5074, 0.1278]}
        mapTypeId = {"ordnanceSurvey"}
        >
    </ReactBingmaps>
  );
}

export default App;
