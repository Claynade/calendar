import React, { useEffect, useState } from "react";
const tasks = [
  1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0,
  1, 0,
];
/* const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
]; */
const months = {
  jan: 31,
  feb: 28,
  mar: 31,
  apr: 30,
  may: 31,
  jun: 30,
  jul: 31,
  aug: 31,
  sep: 30,
  oct: 31,
  nov: 30,
  dec: 31,
};

const currentMonth = "feb";

class MonthlyTaskData {
  constructor(year, month) {
    this.year = year;
    this.month = month;
  }
}

const fetchTasks = async () => {};
/* 
const Days = () => {
  const [dayTasks, setDayTasks] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  const handleChangeCheckbox = (e) => {
    console.log(e.target.value, "yo", e.target.name, "hello");
    console.log(dayTasks);
    setDayTasks((dayTask) => {
      return { ...dayTask, [e.target.name]: e.target.checked };
    });
  };
  return (
    <div className="bg-orange-200 flex flex-row flex-grow space-x-2">
      {days.map((day) => {
        return (
          <div key={day}>
            {tasks.map((task) => {
              return (
                <div>
                  {" "}
                  <form>
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-orange-400 focus:accent-orange-500 text-white"
                      id={`${day}`}
                      name={`${day}`}
                      value=""
                      onChange={handleChangeCheckbox}
                    />
                    <br />
                  </form>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const Day = () => {
  return (
    <>
      <h6>Day</h6>
    </>
  );
};
 */

const CheckBoxes = ({ dayCheck, setDayCheck }) => {
  const handleCheckboxChange = (index) => {
    console.log(dayCheck);
    console.log("33333333333333333333333333333");
    const updatedTasks = [...dayCheck];
    updatedTasks[index] = !updatedTasks[index];
    setDayCheck(updatedTasks);
  };
  return (
    <>
      {[...Array(months[currentMonth])].map((n, index) => {
        return (
          <input
            type="checkbox"
            key={index}
            checked={dayCheck[index]}
            onChange={() => handleCheckboxChange(index)}
          ></input>
        );
      })}
    </>
  );
};
const TasksList = ({ task, setTask, dayCheck, setDayCheck }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
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
  };
  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };
  return (
    <div className="h-3/5 my-2 overflow-y-auto bg-skyGrayBlue">
      {task.map((task, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="w-96 flex items-center border-r-4 border-offWhite pr-2 justify-between">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  id="task"
                  name="task"
                  className="h-8 flex-grow rounded box-border"
                  value={editValue}
                  onChange={() => handleEditChange(index)}
                />
                <div>
                  <button
                    onClick={() => handleSave(index)}
                    className="bg-gray-300 min-w-5 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 min-w-5 rounded"
                  >
                    X
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`h-8 w-96 bg-offWhite border-teal ${
                    index !== 0 ? "border-t-0" : "border-t-2 rounded-t"
                  } border-b-2 border-x-2 overflow-y-auto flex items-center n`}
                >
                  {task}
                </div>
                <button onClick={() => handleEdit(index)} className="pl-2">
                  Edit
                </button>
              </>
            )}
          </div>

          <CheckBoxes dayCheck={dayCheck} setDayCheck={setDayCheck} />
        </div>
      ))}
    </div>
  );
};

const Tasks = () => {
  const [task, setTask] = useState([]);
  const [dayCheck, setDayCheck] = useState([]);
  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    task.length === 0
      ? setTask(new Array(6).fill(""))
      : console.log("gimme an array", task.length);
    setDayCheck(tasks);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.task.value) {
      return;
    }
    setTask([...task, e.target.task.value]);
    setNewTask("");
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setNewTask(e.target.value);
  };
  return (
    <div className=" min-w-96 px-2 w-full flex flex-col box-content">
      <div className="h-1/5 flex-grow-0">
        <h1>{currentMonth}</h1>
      </div>
      <div className="flex">
        <div className="w-96 h-8">Tasks</div>
        <div className="flex flex-grow h-8">
          {[...Array(months[currentMonth])].map((n, index) => {
            return (
              <div className="w-8 border-teal border-2 flex items-center justify-center">
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
      <TasksList
        task={task}
        setTask={setTask}
        dayCheck={dayCheck}
        setDayCheck={setDayCheck}
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
  const tasks = [];
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div>
      <div className="flex flex-row bg-offWhite h-screen">
        <div className="bg-teal min-w-20">Nav</div>
        <div className="flex-grow">
          <div className="flex flex-row space-x-2 h-96 w-full">
            <Tasks />
          </div>
          <div className="flex flex-row space-x-2 w-full">
            <h3>hello world</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

// so there should be cache data which has value of the present month, and on loading the program it loads the tasks and values of that month
// year has 12 months, months has list of tasks [1,0,1,0,0,0,0,1] would mean that task was completed on the first, third and the eight day
//
