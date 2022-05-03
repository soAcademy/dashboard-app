import React, { useState, useEffect } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const Accident = () => {
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoicGFuYXN1biIsImEiOiJja3Jlb3VpazUwcWdwMnltNGE2eWZyemU4In0.orKVn5V00-FYfKWwSAx4mQ",
  });

  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: "100vh",
          width: "92vw",
        }}
        center={[100.523186, 13.736717]}
        zoom={[5]}
      ></Map>
    </div>
  );
};
