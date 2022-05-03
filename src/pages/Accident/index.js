import React, { useState, useEffect } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const Accident = () => {
  // const [toggleSidebar, setToggleSidebar] = useState(false);

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
          width: "90vw",
        }}
        center={[100.523186, 13.736717]}
        zoom={[5]}
      ></Map>
      <div className="bg-white font-bold fixed top-0 m-2 p-2 shadow">
        ข้อมูลผู้เสียชีวิตจากอุบัติเหตุทางถนน
      </div>
      <div className="fixed top-0 right-0 h-screen flex">
        <div className="bg-white p-2 w-48">
          <h3 className="font-bold">สถิติ</h3>
        </div>
      </div>
    </div>
  );
};
