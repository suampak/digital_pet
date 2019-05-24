import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import UserInfo, { User, NewUser, UserLogIn } from "./user.js";
import { PetLists, PetProfile, NewPet } from "./pet.js";
import { loadUser } from "./util.js";
import { server } from "./routes.js";
import axios from "axios";

/* eslint react/prop-types: 0 */

export default function PetSimulator() {
  const [page, setPage] = useState("start");
  const [user, setUser] = useState(new User());
  const [pet, setPet] = useState(null);
  const [query, setQuery] = useState({ name: "", password: "" });
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (query.name && query.password) {
      axios
        .get(`${server}/users?name=${query.name}&password=${query.password}`)
        .then(res => {
          if (res.data.length > 0) {
            let userL = loadUser(res.data[0]);
            setPage("menu");
            setUser(userL);
            toast(<div>Welcome {userL.name}!</div>);
          } else {
            toast(<div>Account Not Found!</div>);
          }
        });
      setQuery({ name: "", password: "" });
    }
    const timerId = setTimeout(() => {
      setTime(time + 1);
      if (user) {
        setUser(
          user
            .depleteAll()
            .fillActionLimitAll()
            .depleteAffectionAll()
        );
      }
    }, 1000);
    return () => clearTimeout(timerId);
  });

  let selPage;

  if (page === "start") {
    selPage = <Start setPage={setPage} />;
  } else if (page === "newUser") {
    selPage = <NewUser setPage={setPage} setUser={setUser} />;
  } else if (page === "logIn") {
    selPage = <UserLogIn setUser={setUser} setQuery={setQuery} />;
  } else if (page === "menu") {
    selPage = (
      <Menu setPage={setPage} setUser={setUser} user={user} setPet={setPet} />
    );
  } else if (page === "newPet") {
    selPage = <NewPet setPage={setPage} setUser={setUser} user={user} />;
  } else {
    selPage = (
      <PetProfile
        setPage={setPage}
        setUser={setUser}
        user={user}
        setPet={setPet}
        pet={pet}
      />
    );
  }

  return <div>{selPage}</div>;
}

const Start = props => {
  return (
    <div className="background">
      <button className="selButton" onClick={() => props.setPage("newUser")}>
        New User
      </button>
      <button className="selButton" onClick={() => props.setPage("logIn")}>
        Existing User
      </button>
    </div>
  );
};

const Menu = props => {
  const handleClick = () => {
    axios.put(
      `${server}/users?name=${props.user.name}&password=${props.user.password}`,
      props.user.updateTime()
    );
    props.setUser(new User());
    props.setPage("start");
    return toast(<div>{props.user.name} has signed off</div>);
  };

  return (
    <div className="background">
      <UserInfo user={props.user} />
      <PetLists
        setPage={props.setPage}
        petLists={props.user.pet}
        setPet={props.setPet}
        numPet={props.user.pet.length}
      />
      <button className="backButton" onClick={handleClick}>
        Log Out
      </button>
    </div>
  );
};
