import React, { useEffect, useState } from "react";
const tasks = [1, 0, 1, 0, 1, 0, 1, 0, 0, 1];
const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];
const fetchTasks = async () => {};
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

const Task = () => {
  return (
    <div className="bg-yellow-200 min-w-96">
      <h4>Task</h4>
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
        <Task />
        <Days />
      </div>
      <div className="flex flex-row space-x-2 h-96 w-screen">
        <h3>hello wrld</h3>
      </div>
    </>
  );
};

export default LandingPage;

// so there should be cache data which has value of the present month, and on loading the program it loads the tasks and values of that month
// year has 12 months, months has list of tasks [1,0,1,0,0,0,0,1] would mean that task was completed on the first, third and the eight day
//
