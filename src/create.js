import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Create() {
  const [student, setstudent] = useState([]);
  const [mentor, setmentor] = useState([]);
  const [sdata, setsdata] = useState([]);
  const [mdata, setmdata] = useState([]);
  const [ndata, setndata] = useState([]);

  useEffect(() => {
    fetcha();
  }, [sdata]);
  useEffect(() => {
    fetchb();
  }, [mdata]);
  useEffect(() => {
    fetchc();
  }, [ndata]);

  let handlesubmit = async (e) => {
    try {
      e.preventDefault();
      setstudent([]);
      let post = await axios.post("http://localhost:3002/student", { student });
    } catch (error) {
      console.log(error);
      console.log("error1");
    }
  };
  let handlesubmitm = async (i) => {
    try {
      i.preventDefault();
      setmentor([]);
      let post = await axios.post("http://localhost:3002/mentor", { mentor });
    } catch (error) {
      console.log(error);
      console.log("error2");
    }
  };
  let fetcha = async () => {
    try {
      let get = await axios.get("http://localhost:3002/students");
      setsdata([...get.data]);
    } catch (error) {
      console.log(error);
      console.log("error3");
    }
  };
  let fetchb = async () => {
    try {
      let get = await axios.get("http://localhost:3002/mentors");
      setmdata([...get.data]);
    } catch (error) {
      console.log(error);
      console.log("error4");
    }
  };
  let fetchc = async () => {
    try {
      let get = await axios.get("http://localhost:3002/studentn");
      setndata([...get.data]);
    } catch (error) {
      console.log(error);
      console.log("error5");
    }
  };
  return (
    <div className="Details">
      <div className="Student">
        <div>
          <u>Create a Student</u>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <input
              type="text"
              placeholder="Student name"
              value={student}
              onChange={(e) => {
                setstudent(e.target.value);
              }}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
      <div className="Mentor">
        <div>
          <u>Create a Mentor</u>
        </div>
        <div>
          <form
            onSubmit={(i) => {
              handlesubmitm(i);
            }}
          >
            <input
              type="text"
              placeholder="Mentor name"
              value={mentor}
              onChange={(i) => {
                setmentor(i.target.value);
              }}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
      <div className="studenttable">
        <div>
          <u>Students</u>
        </div>
        <div className="strial">
          <div>
            <table>
              <thead>
                <tr>
                  <td>S.NO</td>
                  <td>Student</td>
                  <td>Mentors</td>
                </tr>
              </thead>
              <tbody>
                {sdata.map((data, index) => {
                  return (
                    <tr>
                      <td>{index}</td>
                      <td>{data.student}</td>
                      <td>
                        {data.mentors.map((name) => {
                          return <>{name},</>;
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mentortable">
        <div>
          <u>Mentor</u>
        </div>
        <div className="strial">
          <div>
            <table>
              <thead>
                <tr>
                  <td>S.NO</td>
                  <td>Mentor</td>
                  <td>Students</td>
                  <td>choose</td>
                </tr>
              </thead>
              <tbody>
                {mdata.map((data, index) => {
                  return (
                    <tr>
                      <td>{index}</td>
                      <td>{data.mentor}</td>
                      <td>
                        {data.students.map((name) => {
                          return <>{name},</>;
                        })}
                      </td>
                      <td>
                        <Link to={`/select/${data._id}`}>
                          <button> choose</button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="nomentor">
        <div>
          <u>Students with no mentor</u>
        </div>
        <div className="strial">
          <div>
            <table>
              <thead>
                <tr>
                  <td>S.NO</td>
                  <td>Students</td>
                </tr>
              </thead>
              <tbody>
                {ndata.map((data, index) => {
                  return (
                    <tr>
                      <td>{index}</td>
                      <td>{data.student}</td>
                      <td>
                        <Link to={`/create/${data._id}`}>
                          <button>choose</button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
