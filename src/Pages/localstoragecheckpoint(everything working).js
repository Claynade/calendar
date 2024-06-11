import React, { useEffect, useRef, useState } from "react";
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
const currentYear = 2024;

const CheckBoxes = ({ monthCheck, setMonthCheck, index }) => {
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
      {[...Array(months[currentMonth])].map((n, count) => {
        return (
          <input
            type="checkbox"
            key={count}
            checked={monthCheck[index][count]}
            onChange={() => handleCheckboxChange(count)}
          ></input>
        );
      })}
    </>
  );
};
const TasksList = ({ task, setTask, monthCheck, setMonthCheck }) => {
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
                  ref={inputRef}
                  type="text"
                  id="task"
                  name="task"
                  className="h-8 flex-grow rounded box-border"
                  value={editValue}
                  onChange={handleEditChange}
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
                  onDoubleClick={() => handleEdit(index)}
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

          <CheckBoxes
            index={index}
            monthCheck={monthCheck}
            setMonthCheck={setMonthCheck}
          />
        </div>
      ))}
    </div>
  );
};

const Tasks = ({ monthYear, setMonthYear }) => {
  const [task, setTask] = useState([]);
  const [monthCheck, setMonthCheck] = useState([]);
  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    if (localStorage.getItem(`${monthYear[0]}${monthYear[1]}`)) {
      setTask(
        JSON.parse(localStorage.getItem(`${monthYear[0]}${monthYear[1]}`)).tasks
      );
      setMonthCheck(
        JSON.parse(localStorage.getItem(`${monthYear[0]}${monthYear[1]}`))
          .monthCheck
      );
    } else {
      localStorage.setItem(
        `${monthYear[0]}${monthYear[1]}`,
        JSON.stringify({ tasks: task, monthCheck: monthCheck })

        // As the data stored in the local storage will be used for statistics, we need to store
        // all the `${monthYear[0]}${monthYear[1]}`, that we create, in another useState const
      );
    }
  }, [monthYear]);
  useEffect(() => {
    localStorage.setItem(
      `${monthYear[0]}${monthYear[1]}`,
      JSON.stringify({ tasks: task, monthCheck: monthCheck })
    );
  }, [task, monthCheck]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.task.value) {
      return;
    }
    setTask([...task, e.target.task.value]);
    setMonthCheck([...monthCheck, new Array(months[currentMonth]).fill(0)]);
    console.log(Array(months[currentMonth]).fill(0));

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
        monthCheck={monthCheck}
        setMonthCheck={setMonthCheck}
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
  const [monthYear, setMonthYear] = useState([currentMonth, currentYear]);
  useEffect(() => {
    /*     fetchTasks();
     */
  }, []);
  return (
    <div>
      <div className="flex flex-row bg-offWhite h-screen">
        <div className="bg-teal min-w-20">Nav</div>
        <div className="flex-grow">
          <div className="flex flex-row space-x-2 h-96 w-full">
            <Tasks monthYear={monthYear} setMonthYear={setMonthYear} />
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
