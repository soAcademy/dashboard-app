import ThailandDeathCauseData from "../../data/thailand-death-cause.json";
import React, { useState, useEffect } from "react";

export const DeathCause = () => {
  const [data, setData] = useState(ThailandDeathCauseData);
  const [selectedYear, setSelectedYear] = useState(2559);
  const yearsList = [2559, 2558, 2557, 2556, 2555, 2554];
  const [causeOfDeaths, setCauseOfDeaths] = useState([]);
  const [causeOfDeathsList, setCauseOfDeathsList] = useState([]);
  const [totalDeath, setTotalDeath] = useState(0);
  const [deathByProvinces, setDeathByProvinces] = useState([]);

  useEffect(() => {
    const dataByYear = data.filter((r) => r.year === selectedYear);
    const _causeOfDeaths = [...new Set(dataByYear.map((row) => row.causeOfDeath))];
    const _totalDeath = dataByYear.reduce(
      (acc, row) => acc + row.deathMale + row.deathFemale,
      0
    );
    const _causeOfDeathsList = _causeOfDeaths
      .map((causeOfDeath) => ({
        causeOfDeath,
        totalDeath: dataByYear
          .filter((s) => s.causeOfDeath === causeOfDeath)
          .reduce((acc, row) => acc + row.deathMale + row.deathFemale, 0),
      }))
      .sort((a, b) => b.totalDeath - a.totalDeath);
    const _provinces = [...new Set(dataByYear.map((row) => row.provinceName))];
    const _deathByProvinces = _provinces
      .map((province) => ({
        province,
        totalDeath: dataByYear
          .filter((s) => s.provinceName === province)
          .reduce((acc, row) => acc + row.deathMale + row.deathFemale, 0),
      }))
      .sort((a, b) => b.totalDeath - a.totalDeath);

    setCauseOfDeaths(_causeOfDeaths);
    setCauseOfDeathsList(_causeOfDeathsList);
    setTotalDeath(_totalDeath);
    setDeathByProvinces(_deathByProvinces);
  }, [data, selectedYear]);

  const ListComponent = ({ title, number, percentage, enabledCursor }) => (
    <li className={enabledCursor ? `hover:bg-blue-100` : ""}>
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
      <div>
        เลือกปี:{" "}
        <select value={selectedYear} onChange={(e) => setSelectedYear(+e.target.value)}>
          {yearsList.map((year) => (
            <option value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div
        className="w-full flex mt-4 gap-x-4"
        style={{ maxHeight: "90vh" }}
      >
        <div className="border border-gray-200 w-5/12">
          <h3 className="font-bold p-2">สาเหตุการเสียชีวิตปี {selectedYear}</h3>
          <ul
            className="text-sm bg-scroll overflow-scroll"
            style={{ maxHeight: "85vh" }}
          >
            <ListComponent
              title="ทั้งหมด"
              number={totalDeath}
              percentage="100%"
              enabledCursor={true}
            />
            {causeOfDeathsList.map((row, idx) => (
              <ListComponent
                title={row.causeOfDeath}
                number={row.totalDeath}
                percentage={`${((row.totalDeath / totalDeath) * 100).toFixed(
                  2
                )}%`}
                enabledCursor={true}
              />
            ))}
          </ul>
        </div>
        <div className="border border-gray-200 flex-auto">
          <h3 className="font-bold p-2">จำนวนผู้เสียชีวิตแยกตามจังหวัดปี {selectedYear}</h3>
          <ul
            className="text-sm overflow-scroll"
            style={{ maxHeight: "85vh" }}
          >
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
        <div className="bg-red-300 w-1/4">C</div>
      </div>
    </div>
  );
};
