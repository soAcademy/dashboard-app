import ThailandZipcodeData from "../../data/thailand-zipcode.json";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const ZipcodeProvince = () => {
  const [data, setData] = useState(ThailandZipcodeData);
  let { province } = useParams();
  const [zipcodeData, setZipcodeData] = useState([]);

  useEffect(() => {
    const _zipcodeData = data.filter((r) => r.province === province);
    setZipcodeData(_zipcodeData);
  }, [data, province]);

  return (
    <div className="p-4 text-center mt-8">
      <div className="">
        <Link to="/zipcode" className="hover:underline">หน้าแรก</Link>{" "}
        <span className="text-gray-400">/ {province}</span>
      </div>
      <h2 className="text-2xl">รหัสไปรษณีย์ใน จังหวัด{province}</h2>
      <div className="flex mt-4">
        <div className="w-1/5"></div>
        <table className="w-3/5 table-auto border border-gray-100">
          <thead>
            <tr className="font-bold border border-gray-100">
              <td className="border border-gray-100">#</td>
              <td className="border border-gray-100">ตำบล/เขต</td>
              <td className="border border-gray-100">อำเภอ/แขวง</td>
              <td className="border border-gray-100">รหัสไปรษณีย์</td>
            </tr>
          </thead>
          <tbody>
            {zipcodeData.map((r, idx) => (
              <tr>
                <td className="border border-gray-100">{idx + 1}</td>
                <td className="border border-gray-100">{r.subdistrict}</td>
                <td className="border border-gray-100">{r.district}</td>
                <td className="border border-gray-100">
                  {r.zipcode}
                  <span
                    className="ml-2 text-blue-700 hover:underline active:text-blue-500 cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(r.zipcode)}
                  >
                    คัดลอก
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
