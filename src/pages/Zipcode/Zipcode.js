import ThailandZipcodeData from "../../data/thailand-zipcode.json";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Zipcode = () => {
  const [data, setData] = useState(ThailandZipcodeData);
  const [provinces, setProvinces] = useState([]);
  const [query, setQuery] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const _provinces = [...new Set(data.map((r) => r.province))];

    setProvinces(_provinces);
  }, [data]);

  useEffect(() => {
    const _results =
      query !== null && query !== ""
        ? data.filter(
          (r) =>
            r.province.includes(query) ||
            r.district.includes(query) ||
            r.subdistrict.includes(query) ||
            String(r.zipcode).includes(query)
        )
        : [];
    setResults(_results);
  }, [data, query]);

  return (
    <div className="p-4 text-center">
      <h1 className="font-bold text-2xl mt-8">ค้นหารหัสไปรษณีย์</h1>
      <div className="flex">
        <div className="w-1/5"></div>
        <div className="w-3/5">
          <input
            type="text"
            className="border border-gray-300 p-2 mt-4 rounded-lg w-full"
            onInput={(e) => setQuery(e.target.value)}
            placeholder="ค้นหา ตำบล อำเภอ"
          />
          {results.length > 0 && (
            <div className="border border-gray-300 rounded-lg text-left">
              <div className="text-sm text-gray-600 p-2">
                ผลลัพธ์การค้นหาทั้งหมด {results.length} รายการ
              </div>
              {results.slice(0, 10).map((r) => (
                <Link to={`/zipcode/${r.province}`}>
                  <div className="py-2 hover:bg-blue-100 hover:cursor-pointer px-2">
                    {r.subdistrict} {r.district} {r.province} {r.zipcode}
                  </div></Link>
              ))}
            </div>
          )}
        </div>
      </div>
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
