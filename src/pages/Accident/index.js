import ThailandAccidentalData from "../../data/thailand-accidental.json";
import React, { useState, useEffect } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactECharts from "echarts-for-react";
import reddot from "../../assets/reddot.png";

export const Accident = () => {
  const [data, setData] = useState(ThailandAccidentalData);
  const [totalPeople, setTotalPeople] = useState({ male: 0, female: 0 });
  const [totalVehicles, setTotalVehicles] = useState([]);
  const [sexChartOptions, setSexChartOptions] = useState({});
  const [vehicleChartOptions, setVehicleChartOptions] = useState({});

  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoicGFuYXN1biIsImEiOiJja3Jlb3VpazUwcWdwMnltNGE2eWZyemU4In0.orKVn5V00-FYfKWwSAx4mQ",
  });

  useEffect(() => {
    const _totalPeople = {
      male: data.filter((r) => r.sex === 1).length,
      female: data.filter((r) => r.sex === 2).length,
    };
    const vehicles = [...new Set(data.map((r) => r.vehicle))];
    const _totalVehicles = vehicles.map((vehicle) => ({
      type: vehicle,
      total: data.filter((r) => r.vehicle === vehicle).length,
    }));

    const _sexChartOptions = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "เพศ",
          type: "pie",
          radius: "50%",
          data: [
            { value: _totalPeople.male, name: "ชาย" },
            { value: _totalPeople.female, name: "หญิง" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    const _vehicleChartOptions = {
      xAxis: {
        type: "category",
        data: vehicles,
        axisLabel: { interval: 0, rotate: 90 },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: _totalVehicles.map((r) => r.total),
          type: "bar",
        },
      ],
    };

    setTotalPeople(_totalPeople);
    setTotalVehicles(_totalVehicles);
    setSexChartOptions(_sexChartOptions);
    setVehicleChartOptions(_vehicleChartOptions);
  }, [data]);

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
      >
        <Layer type="circle" paint={{
          circleStrokeWidth: 4,
          circleRadius: 10,
          circleColor: "#FFF070"
        }}>
          <Feature key={1} coordinates={[100.523186, 13.736717]} />
        </Layer>
      </Map>

      <div className="bg-white font-bold fixed top-0 m-2 p-2 shadow">
        ข้อมูลผู้เสียชีวิตจากอุบัติเหตุทางถนน {data.length}
      </div>
      <div className="fixed top-0 right-0 h-full flex overflow-y-auto bg-white">
        <div className="p-4 w-72">
          <h3 className="font-bold">สถิติ</h3>
          <div className="mt-2">
            <p>เพศ</p>
            <p>ชาย: {totalPeople.male.toLocaleString()} คน</p>
            <p>หญิง: {totalPeople.female.toLocaleString()} คน</p>
          </div>
          <div className="mt-2">
            <ReactECharts
              option={sexChartOptions}
              notMerge={true}
              lazyUpdate={true}
            />
          </div>
          <div className="mt-2">
            <p>ยานพาหนะ</p>
            {totalVehicles
              .sort((a, b) => b.total - a.total)
              .map((r) => (
                <p>
                  {r.type}: {r.total.toLocaleString()} คัน
                </p>
              ))}
          </div>
          <div className="mt-2">
            <ReactECharts
              option={vehicleChartOptions}
              notMerge={true}
              lazyUpdate={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
