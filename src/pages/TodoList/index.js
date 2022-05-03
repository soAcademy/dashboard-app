import React, { useState, useEffect } from "react";

export const TodoList = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) ?? []
  );
  const [isShowAddPopup, setIsShowAddPopup] = useState(false);
  const [inputTask, setInputTask] = useState(null);
  const bgColors = [
    "#e0efc0",
    "#f7be9e",
    "#f88989",
    "#a7a5a5",
    "#b5ece0",
    "#cfe2f3",
    "#ead1dc",
    "#e0b6cb",
    "#d9d2e9",
    "#d0e5c9",
  ];

  const submitTask = (content) => {
    const _tasks = [
      ...tasks,
      {
        content,
        isDone: false,
        timestamp: new Date(),
        bgColor: bgColors[Math.floor(Math.random() * bgColors.length)],
      },
    ];
    setTasks(_tasks);
    setInputTask(null);
    setIsShowAddPopup(false);
    localStorage.setItem("tasks", JSON.stringify(_tasks));
    console.log(_tasks);
  };

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl">บันทึกของฉัน</h1>
      <button
        className="button w-12 h-12 rounded-full bg-orange-400 hover:bg-orange-500 active:bg-orange-600 text-3xl text-white fixed bottom-8 right-8"
        onClick={() => setIsShowAddPopup(true)}
      >
        +
      </button>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {tasks
          .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp))
          .map((r) => (
            <div
              className="h-32 rounded-lg p-2 flex flex-col"
              style={{ backgroundColor: r.bgColor }}
            >
              <div className="flex-auto">{r.content}</div>
              <div className="text-xs">
                {new Date(r.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
      </div>
      {isShowAddPopup && (
        <div className="flex absolute top-24 w-screen -ml-20">
          <div className="w-1/3"></div>
          <div className="border border-gray-200 bg-white w-1/3">
            <div className="flex p-4">
              <div>
                <h2 className="font-bold">เพิ่มโน๊ต</h2>
              </div>
              <div
                className="flex-auto text-right hover:cursor-pointer active:text-gray-300"
                onClick={() => setIsShowAddPopup(false)}
              >
                ปิด
              </div>
            </div>
            <div className="w-full px-4">
              <textarea
                id="taskDetail"
                className="w-full border border-gray-200 p-2"
                onChange={(e) => setInputTask(e.target.value)}
                rows="4"
              />
              <button
                className="button bg-teal-500 hover:bg-teal-600 active:bg-teal-700 w-full py-2 my-2 font-bold"
                onClick={() => submitTask(inputTask)}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
