import React, { useEffect, useState } from "react";
const tasks = [1, 0, 1, 0, 1, 0, 1, 0, 0, 1];
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

const currentMonth = "jan";

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
const Tasks = () => {
  const [task, setTask] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const [newTask, setNewTask] = useState("");
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.task.value) {
      return;
    }
    setTask([...task, e.target.task.value]);
    setNewTask("");
  };
  const handleEdit = (index) => {
    setEditIndex(index);
  };
  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <div className="bg-yellow-500 min-w-96 flex flex-col px-1 box-content">
      <div className="h-1/4"></div>
      <div className="h-3/5 overflow-y-auto">
        {task.map((task, index) => (
          <div key={index} className="flex items-center justify-between">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  id="task"
                  name="task"
                  className="h-10 flex-grow box-bo"
                  value={editValue}
                  onChange={handleEditChange}
                />
                <div>
                  <button
                    onClick={() => handleSave(index)}
                    className="bg-gray-300 rounded mx-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h4>{task}</h4>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="h-1/5 flex flex-col flex-grow bg-blue-200">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            id="task"
            name="task"
            value={newTask}
            onChange={handleInputChange}
            className="w-full h-10"
          />
          <button type="submit" className="w-full bg-red-400 h-10">
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
    <>
      <div className="flex flex-row space-x-2 h-96 w-screen">
        <Tasks />
      </div>
      <div className="flex flex-row space-x-2 h-96 w-screen">
        <h3>hello world</h3>
      </div>
    </>
  );
};

export default LandingPage;

// so there should be cache data which has value of the present month, and on loading the program it loads the tasks and values of that month
// year has 12 months, months has list of tasks [1,0,1,0,0,0,0,1] would mean that task was completed on the first, third and the eight day
//
