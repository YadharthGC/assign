import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Select() {
  const [sdata, setsdata] = useState([]);
  const params = useParams();
  const did = params.id;
  const navigate = useNavigate();
  const [load, setload] = useState(true);

  useEffect(() => {
    fetcha();
  }, []);

  useEffect(() => {
    fetchb();
  }, [sdata]);

  let fetcha = async () => {
    try {
      let get = await axios.post("http://localhost:3002/select", { did });
    } catch (error) {
      console.log(error);
      console.log("error3");
    }
  };
  let fetchb = async () => {
    try {
      let get = await axios.get("http://localhost:3002/current");
      setsdata([...get.data[0].final]);
      console.log(get);
      setload(false);
    } catch (error) {
      console.log(error);
      console.log("error33");
      setload(false);
    }
  };
  let posts = async (data) => {
    try {
      navigate("/", { replace: true });
      let post = await axios.post("http://localhost:3002/idb", {
        did,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Selectsection">
      <div>Select Students</div>
      {load ? (
        <h2>Loading</h2>
      ) : (
        <div className="buttons">
          {sdata.map((data) => {
            return (
              <button
                onClick={() => {
                  posts(data);
                }}
              >
                {data}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Select;
