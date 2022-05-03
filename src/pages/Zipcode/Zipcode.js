import ThailandZipcodeData from "../../data/thailand-zipcode.json";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Zipcode = () => {
  const [data, setData] = useState(ThailandZipcodeData);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const _provinces = [...new Set(data.map((r) => r.province))];

    setProvinces(_provinces);
  }, data);

  return (
    <div className="p-4 text-center">
      <h1 className="font-bold text-2xl mt-8">ค้นหารหัสไปรษณีย์</h1>
      <input
        type="text"
        className="border border-gray-300 p-2 mt-4 rounded-lg w-3/5"
        placeholder="ค้นหา ตำบล อำเภอ"
      />
      <div className="text-left w-full mt-8 flex">
        <div className="w-1/5"></div>
        <div className="w-3/5">
          <h2 className="font-bold text-xl">เลือกจังหวัด</h2>
          <div className="grid grid-cols-4 mt-4">
            {provinces.map((province) => (
              <div>
                <Link
                  to={`/zipcode/${province}`}
                  className="text-blue-600 hover:underline"
                >
                  {province}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
