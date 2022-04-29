import ThailandDeathCauseData from "../../data/thailand-death-cause.json";
import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

export const DeathCause = () => {
  const [data, setData] = useState(ThailandDeathCauseData);
  const [selectedYear, setSelectedYear] = useState(2559);
  const [selectedCause, setSelectedCause] = useState(null);
  const yearsList = [2559, 2558, 2557, 2556, 2555, 2554];
  const [causeOfDeaths, setCauseOfDeaths] = useState([]);
  const [causeOfDeathsList, setCauseOfDeathsList] = useState([]);
  const [totalDeath, setTotalDeath] = useState(0);
  const [deathByProvinces, setDeathByProvinces] = useState([]);
  const [deathBySex, setDeathBySex] = useState({ male: 0, female: 0 });
  const [lineChartOptions, setLineChartOptions] = useState({});
  const [pieChartOptions, setPieChartOptions] = useState({});

  useEffect(() => {
    const dataFilter = data.filter((r) => r.year === selectedYear);
    const _causeOfDeaths = [
      ...new Set(dataFilter.map((row) => row.causeOfDeath)),
    ];
    const _totalDeath = dataFilter.reduce(
      (acc, row) => acc + row.deathMale + row.deathFemale,
      0
    );
    const _causeOfDeathsList = _causeOfDeaths
      .map((causeOfDeath) => ({
        causeOfDeath,
        totalDeath: dataFilter
          .filter((s) => s.causeOfDeath === causeOfDeath)
          .reduce((acc, row) => acc + row.deathMale + row.deathFemale, 0),
      }))
      .sort((a, b) => b.totalDeath - a.totalDeath);
    const _provinces = [...new Set(dataFilter.map((row) => row.provinceName))];
    const _deathByProvinces = _provinces
      .map((province) => ({
        province,
        totalDeath: dataFilter
          .filter(
            (s) =>
              s.provinceName === province &&
              (s.causeOfDeath === selectedCause ||
                selectedCause === null ||
                selectedCause === "ทั้งหมด")
          )
          .reduce((acc, row) => acc + row.deathMale + row.deathFemale, 0),
      }))
      .sort((a, b) => b.totalDeath - a.totalDeath);
    const dataFilterByCause = dataFilter.filter(
      (s) =>
        s.causeOfDeath === selectedCause ||
        selectedCause === null ||
        selectedCause === "ทั้งหมด"
    );
    const _deathBySex = {
      male: dataFilterByCause.reduce((acc, row) => acc + row.deathMale, 0) ?? 0,
      female:
        dataFilterByCause.reduce((acc, row) => acc + row.deathFemale, 0) ?? 0,
    };

    const _lineChartOptions = {
      xAxis: {
        type: "category",
        data: yearsList,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: yearsList
            .reverse()
            .map((year) =>
              data
                .filter(
                  (row) =>
                    row.year === year &&
                    (row.causeOfDeath === selectedCause ||
                      selectedCause === null ||
                      selectedCause === "ทั้งหมด")
                )
                .reduce((acc, row) => acc + row.deathMale + row.deathFemale, 0)
            ),
          type: "line",
          smooth: true,
        },
      ],
    };
    const _pieChartOptions = {
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
            { value: _deathBySex.male, name: "ชาย" },
            { value: _deathBySex.female, name: "หญิง" },
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

    setCauseOfDeaths(_causeOfDeaths);
    setCauseOfDeathsList(_causeOfDeathsList);
    setTotalDeath(_totalDeath);
    setDeathByProvinces(_deathByProvinces);
    setDeathBySex(_deathBySex);
    setLineChartOptions(_lineChartOptions);
    setPieChartOptions(_pieChartOptions);
  }, [data, selectedYear, selectedCause]);

  const ListComponent = ({
    title,
    number,
    percentage,
    enabledCursor,
    setSelected,
  }) => (
    <li
      className={enabledCursor ? `hover:bg-blue-100` : ""}
      onClick={enabledCursor ? () => setSelected(title) : null}
    >
      <div
        className={`w-full flex px-2 py ${
          enabledCursor ? "cursor-pointer" : "pointer"
        }`}
      >
        <div className="w-3/5 mr-2">{title}</div>
        <div className="w-2/5">
          <div className="flex w-full text-xs text-white">
            <div className="w-1/2 bg-blue-800 text-right pr-2">
              {number.toLocaleString()}
            </div>
            <div className="w-1/2 bg-teal-600 pl-2">{percentage}</div>
          </div>
        </div>
      </div>
    </li>
  );

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl">
        จำนวนผู้เสียชีวิต สาเหตุ และอัตราการตาย ปี 2554 - 2559
      </h1>
      <div className="mt-2">
        เลือกปี:{" "}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(+e.target.value)}
        >
          {yearsList.map((year) => (
            <option value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="mt-2">
        ปี {selectedYear} :: สาเหตุการเสียชีวิต: {selectedCause}
      </div>
      <div className="w-full flex mt-4 gap-x-4" style={{ maxHeight: "80vh" }}>
        <div className="border border-gray-200 w-5/12">
          <h3 className="font-bold p-2">สาเหตุการเสียชีวิตปี {selectedYear}</h3>
          <ul
            className="text-sm bg-scroll overflow-scroll"
            style={{ maxHeight: "75vh" }}
          >
            <ListComponent
              title="ทั้งหมด"
              number={totalDeath}
              percentage="100%"
              enabledCursor={true}
              setSelected={setSelectedCause}
            />
            {causeOfDeathsList.map((row, idx) => (
              <ListComponent
                title={row.causeOfDeath}
                number={row.totalDeath}
                percentage={`${((row.totalDeath / totalDeath) * 100).toFixed(
                  2
                )}%`}
                enabledCursor={true}
                setSelected={setSelectedCause}
              />
            ))}
          </ul>
        </div>
        <div className="border border-gray-200 flex-auto">
          <h3 className="font-bold p-2">
            จำนวนผู้เสียชีวิตแยกตามจังหวัดปี {selectedYear}
          </h3>
          <ul className="text-sm overflow-scroll" style={{ maxHeight: "75vh" }}>
            <ListComponent
              title="ทั้งหมด"
              number={totalDeath}
              percentage="100%"
            />
            {deathByProvinces.map((row, idx) => (
              <ListComponent
                title={row.province}
                number={row.totalDeath}
                percentage={`${((row.totalDeath / totalDeath) * 100).toFixed(
                  2
                )}%`}
              />
            ))}
          </ul>
        </div>
        <div className="border border-gray-200 w-1/4 p-2">
          <h3 className="font-bold">แนวโน้มการเสียชีวิต</h3>
          <div className="mt-2">
            <ReactECharts
              option={lineChartOptions}
              notMerge={true}
              lazyUpdate={true}
              theme={"theme_name"}
            />
          </div>
          <h3 className="font-bold">จำนวนผู้เสียชีวิตแยกตามเพศ</h3>
          <div className="text-sm mt-2">
            <p>ชาย: {deathBySex.male.toLocaleString()} คน</p>
            <p>หญิง: {deathBySex.female.toLocaleString()} คน</p>
            <ReactECharts
              option={pieChartOptions}
              notMerge={true}
              lazyUpdate={true}
              theme={"theme_name"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
