import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Choose() {
  const [mdata, setmdata] = useState([]);
  const [assign, setassign] = useState([]);
  const params = useParams();
  const did = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    fetchb();
  }, [mdata]);

  let posta = async (mentor) => {
    try {
      navigate("/", { replace: true });
      let post = await axios.post("http://localhost:3002/id", { did, mentor });
    } catch (error) {}
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
  return (
    <div className="Choose">
      <div>Assign a mentor</div>
      <div className="buttons">
        {mdata.map((data) => {
          return (
            <button
              onClick={() => {
                posta(data.mentor);
              }}
            >
              {data.mentor}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Choose;
