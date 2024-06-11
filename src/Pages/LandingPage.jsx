import React, { useEffect, useRef, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const randomColor = () => {
  const value = `rgba(
    ${Math.floor(Math.random() * 253)},${Math.floor(
    Math.random() * 253
  )},${Math.floor(Math.random() * 253)},1
  )`;
  console.log(value);
  return value;
};

const daysInMonths = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

const months = {
  1: "JAN",
  2: "FEB",
  3: "MAR",
  4: "APR",
  5: "MAY",
  6: "JUN",
  7: "JUL",
  8: "AUG",
  9: "SEP",
  10: "OCT",
  11: "NOV",
  12: "DEC",
};

/* 
const LineGraph = ({ monthYear, task, monthCheck, taskColor }) => {
  const data = {
    labels: new Array(daysInMonths[monthYear[0]])
      .fill()
      .map((_, index) => index + 1),
    datasets: task.map((task, index) => {
      return {
        label: task,
        data: new Array(daysInMonths[monthYear[0]])
          .fill()
          .map(
            (_, index2) =>
              monthCheck[index]
                .slice(0, index2)
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                ) / index2
          ),
        // summing elements till index 2 and then dividing it by index2
        fill: false,
        borderColor: taskColor[index],
        tension: 0.5,
      };
    }),
  };
  return (
    <div className="w-auto h-72">
      <h3 className="text-darkTeal">Your Progress:</h3>
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}; */
const LineGraph = ({ monthYear, monthCheck }) => {
  const data = {
    labels: new Array(daysInMonths[monthYear[0]])
      .fill()
      .map((_, index) => index + 1),
    datasets: [
      {
        label: "your progress",
        data: new Array(daysInMonths[monthYear[0]]).fill().map((_, index) => {
          let sum = 0;
          let total = 0;
          Object.keys(monthCheck).forEach((key) => {
            total += 1;
            if (monthCheck[key][index + 1]) {
              sum = sum + 1;
            }
          });
          return sum / total;
        }),
        fill: false,
        tension: 0.2,
      },
    ],
  };
  return (
    <div className="w-auto h-72">
      <h3 className="text-darkTeal">Your Progress:</h3>
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
function Dropdown_MM_YY({ monthYear, setMonthYear }) {
  const handleMonthChange = (e) => {
    setMonthYear([e.target.value, monthYear[1]]);
  };
  const handleYearChange = (e) => {
    setMonthYear([monthYear[0], e.target.value]);
  };

  console.log(monthYear);

  return (
    <div>
      <select
        value={monthYear[0]}
        onChange={handleMonthChange}
        className="text-2xl bg-offWhite"
      >
        {Object.values(months).map((month, index) => (
          <option key={index} value={index + 1}>
            {month}
          </option>
        ))}
      </select>
      <select
        value={monthYear[1]}
        onChange={handleYearChange}
        className="text-2xl bg-offWhite max-h-8"
      >
        {Array.from({ length: 101 }, (_, index) => 2024 + index).map(
          // creating an array from 2024 to 2124
          (year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          )
        )}
      </select>
    </div>
  );
}

const CheckBoxes = ({ monthCheck, setMonthCheck, index, monthYear }) => {
  const handleCheckboxChange = (count) => {
    const updatedChecks = monthCheck.map((dayCheck, i) => {
      if (i === index) {
        const updatedDayCheck = [...dayCheck];
        updatedDayCheck[count] = !updatedDayCheck[count];
        return updatedDayCheck;
      }
      return dayCheck;
    });
    setMonthCheck(updatedChecks);
  };
  return (
    <>
      {[...Array(daysInMonths[monthYear[0]])].map((n, count) => {
        return (
          <div
            key={count}
            className="w-8 h-8 border-darkSkyBlue border-r-2 flex flex-row items-center justify-center"
            onClick={() => handleCheckboxChange(count)}
          >
            <input
              type="checkbox"
              className="h-4 w-4 accent-teal"
              checked={monthCheck[index][count]}
              onChange={() => handleCheckboxChange(count)}
            ></input>
          </div>
        );
      })}
    </>
  );
};
const TasksList = ({
  task,
  setTask,
  monthCheck,
  setMonthCheck,
  monthYear,
  taskColor,
  setTaskColor,
}) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef(null);
  const handleSave = (index) => {
    if (!editValue) {
      return;
    }
    const updatedTasks = [...task];
    updatedTasks[index] = editValue;
    setTask(updatedTasks);
    setEditIndex(-1);
    setEditValue("");
  };
  const handleCancel = () => {
    setEditIndex(-1);
    setEditValue("");
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    setTimeout(() => {
      inputRef.current.focus(); // Focus on the input field after a short delay
    }, 0);
  };
  const handleDelete = (index) => {
    let updatedTasks = [...task];
    updatedTasks = updatedTasks.filter((item, i) => i !== index);
    setTask(updatedTasks);
    let updatedTaskColors = [...taskColor];
    updatedTaskColors = updatedTaskColors.filter((item, i) => i !== index);
    setTaskColor(updatedTaskColors);
    //updating Tasks
    let updatedMonthCheck = [...monthCheck];
    updatedMonthCheck = updatedMonthCheck.filter((item, i) => i !== index);
    setMonthCheck(updatedMonthCheck);
    //updating MonthChecks
  };
  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };
  return (
    <div className="h-3/5 my-2 overflow-y-auto bg-skyGrayBlue">
      {task.map((task, index) => (
        <div key={index} className="flex">
          <div className="w-96 flex items-center border-r-4 border-offWhite pr-2 justify-between">
            {editIndex === index ? (
              <>
                <div>
                  <input
                    ref={inputRef}
                    type="text"
                    id="task"
                    name="task"
                    className="h-8 w-72 max-w-72 border-b-2 border-x-2 border-teal focus:border-none  focus:outline-teal flex items-center box-border"
                    value={editValue}
                    onChange={handleEditChange}
                  />
                </div>
                <button onClick={() => handleSave(index)} className="pl-2 w-8">
                  +
                </button>
                <button onClick={handleCancel} className="pl-2 w-8">
                  X
                </button>
              </>
            ) : (
              <>
                <div
                  onDoubleClick={() => handleEdit(index)}
                  className={`h-8 w-72 bg-offWhite border-darkSkyBlue ${
                    index !== 0 ? "border-t-0" : "border-t-2 rounded-t"
                  } border-b-2 px-2 border-x-2 overflow-y-auto flex items-center box-border n`}
                >
                  {task}
                </div>
                <button onClick={() => handleEdit(index)} className="pl-2 w-8">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="pl-2 w-8"
                >
                  Del
                </button>
              </>
            )}
          </div>

          <CheckBoxes
            index={index}
            monthCheck={monthCheck}
            setMonthCheck={setMonthCheck}
            monthYear={monthYear}
          />
        </div>
      ))}
    </div>
  );
};

const Tasks = ({
  monthYear,
  setMonthYear,
  task,
  setTask,
  monthCheck,
  setMonthCheck,
  taskColor,
  setTaskColor,
}) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.task.value) {
      return;
    }
    setTaskColor([...taskColor, randomColor()]);
    setTask([...task, e.target.task.value]);
    setMonthCheck([
      ...monthCheck,
      new Array(daysInMonths[monthYear[0]]).fill(0),
    ]);
    setNewTask("");
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setNewTask(e.target.value);
  };
  return (
    <div className=" min-w-96 px-2 w-full flex flex-col box-content">
      <div className="h-1/5 flex-grow-0">
        <h1>
          <Dropdown_MM_YY monthYear={monthYear} setMonthYear={setMonthYear} />
          {/*           {months[monthYear[0]]},{monthYear[1]}
           */}{" "}
        </h1>
      </div>
      <div className="flex">
        <div className="w-96 h-8">Tasks</div>
        <div className="flex flex-grow h-8">
          {[...Array(daysInMonths[monthYear[0]])].map((n, index) => {
            return (
              <div
                key={index}
                className={`w-8 border-teal ${
                  index === 0 ? "border-l-2 " : ""
                } border-r-2 border-y-2 flex items-center justify-center`}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
      <TasksList
        task={task}
        setTask={setTask}
        monthCheck={monthCheck}
        setMonthCheck={setMonthCheck}
        monthYear={monthYear}
        taskColor={taskColor}
        setTaskColor={setTaskColor}
      />
      <div className="h-1/5 flex flex-col flex-grow">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            id="task"
            name="task"
            value={newTask}
            onChange={handleInputChange}
            className="w-96 border-mintGreen border-2 h-9"
          />
          <button type="submit" className="w-96 bg-mintGreen h-10">
            Add New Task
          </button>
        </form>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const d = new Date();
  const currentMonth = d.getMonth() + 1;
  const currentYear = d.getFullYear();

  if (currentYear % 4 === 0) {
    daysInMonths[2] = 29;
  } else {
  }
  const [monthYear, setMonthYear] = useState([currentMonth, currentYear]);
  const [task, setTask] = useState([]);
  const [monthCheck, setMonthCheck] = useState([]);
  const [taskColor, setTaskColor] = useState([]);
  useEffect(() => {
    if (localStorage.getItem(`${monthYear[0]}${monthYear[1]}`)) {
      setTask(
        JSON.parse(localStorage.getItem(`${monthYear[0]}${monthYear[1]}`)).tasks
      );
      setMonthCheck(
        JSON.parse(localStorage.getItem(`${monthYear[0]}${monthYear[1]}`))
          .monthCheck
      );
      setTaskColor(
        JSON.parse(localStorage.getItem(`${monthYear[0]}${monthYear[1]}`))
          .taskColor
      );
    } else {
      setTask([]);
      setMonthCheck([]);
      setTaskColor([]);
      localStorage.setItem(
        `${monthYear[0]}${monthYear[1]}`,
        JSON.stringify({
          tasks: task,
          monthCheck: monthCheck,
          taskColor: taskColor,
        })
      );
    }
  }, [monthYear]);
  useEffect(() => {
    localStorage.setItem(
      `${monthYear[0]}${monthYear[1]}`,
      JSON.stringify({
        tasks: task,
        monthCheck: monthCheck,
        taskColor: taskColor,
      })
    );
  }, [task, monthCheck]);

  return (
    <div className="flex flex-row bg-offWhite h-screen">
      <div className="bg-teal min-w-20">Nav</div>
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-row space-x-2 h-96 w-full">
          <Tasks
            monthYear={monthYear}
            setMonthYear={setMonthYear}
            task={task}
            setTask={setTask}
            monthCheck={monthCheck}
            setMonthCheck={setMonthCheck}
            taskColor={taskColor}
            setTaskColor={setTaskColor}
          />
        </div>
        <div className="flex flex-col space-x-2 w-full">
          <LineGraph
            monthYear={monthYear}
            task={task}
            monthCheck={monthCheck}
            taskColor={taskColor}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
