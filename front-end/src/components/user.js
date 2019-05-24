import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "./routes.js";
import { Pet } from "./pet.js";
import {
  MAXPARA,
  DIFFSTATUS,
  LOWERBOUND,
  ISREQUIRED,
  MINDATE,
  MAXDATE
} from "./constant.js";

/* eslint react/prop-types: 0 */

export default class UserInfo extends React.Component {
  render() {
    const userInfo = this.props.user;
    return (
      <ul>
        <li>
          <label>Name: </label>
          {userInfo.name}
        </li>
        <li>
          <label>Gender: </label>
          {userInfo.gender}
        </li>
        <li>
          <label>Birthday: </label>
          {userInfo.bday}
        </li>
        <li>
          <label>EXP: </label>
          <progress value={userInfo.exp} max={MAXPARA} />
        </li>
        <li>
          <label>Points: </label>
          <progress value={userInfo.point} max={MAXPARA} />
        </li>
        <li>
          <label>Pets: </label>
        </li>
      </ul>
    );
  }
}

export class User {
  constructor(
    name = "",
    password = "",
    gender = "",
    bday = "",
    exp = 0,
    point = 0,
    pet = [],
    timestamp
  ) {
    this.name = name;
    this.password = password;
    this.gender = gender;
    this.bday = bday;
    this.exp = exp;
    this.point = point;
    this.pet = pet;
    this.timestamp = timestamp || new Date();
  }

  addPet(name, type, gender) {
    this.pet.push(new Pet(name, type, gender));
    return this;
  }

  removePet(pet) {
    this.pet.splice(this.pet.indexOf(pet), 1);
    axios.put(
      `${server}/users?name=${this.name}&password=${this.password}`,
      this.updateTime()
    );
    return this;
  }

  depleteAll() {
    for (let p in this.pet) {
      this.pet[p].deplete(DIFFSTATUS, DIFFSTATUS, DIFFSTATUS, DIFFSTATUS);
    }
    return this;
  }

  depleteAffectionAll() {
    for (let p in this.pet) {
      this.pet[p].depleteAffection();
      if (this.pet[p].affection < LOWERBOUND) {
        toast(<div>{this.pet[p].name} is leaving...</div>);
        this.removePet(this.pet[p]);
      }
    }
    return this;
  }

  fillActionLimitAll() {
    for (let p in this.pet) {
      this.pet[p].fillActionLimit();
    }
    return this;
  }

  gainEXP(EXP) {
    this.exp = this.exp + EXP > MAXPARA ? MAXPARA : this.exp + EXP;
    return this;
  }

  updateTime() {
    this.timestamp = new Date();
    return this;
  }
}

export const NewUser = props => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [bday, setBday] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    props.setPage("menu");

    const user = new User(name, password, gender, bday);
    axios.post(`${server}/users`, user);
    props.setUser(user);
    setName("");
    setGender("Male");
    setBday("");
    setPassword("");
    return toast(<div>Welcome {name}!</div>);
  };

  return (
    <div className="background">
      <form className="userForm" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="Your Name"
            required={ISREQUIRED}
          />
        </label>
        <br />

        <label>
          Gender:
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={event => setGender(event.target.value)}
            checked={gender === "Male"}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={event => setGender(event.target.value)}
            checked={gender === "Female"}
          />
          Female
        </label>
        <br />

        <label>
          Date:
          <input
            type="date"
            name="bday"
            value={bday}
            min={MINDATE}
            max={MAXDATE}
            onChange={event => setBday(event.target.value)}
            required={ISREQUIRED}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
            required={ISREQUIRED}
          />
        </label>
        <br />

        <input
          className="confirmButton"
          type="submit"
          name="submit"
          value="Create User"
        />
      </form>

      <button className="backButton" onClick={() => props.setPage("start")}>
        Back
      </button>
    </div>
  );
};

export const UserLogIn = props => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = event => {
    event.preventDefault();
    props.setQuery({ name: name, password: password });
    setName("");
    setPassword("");
  };

  return (
    <div className="background">
      <form className="userForm" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="Your Name"
            required={ISREQUIRED}
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
            required={ISREQUIRED}
          />
        </label>
        <br />

        <input
          className="confirmButton"
          type="submit"
          name="submit"
          value="Log In"
        />
      </form>

      <button className="backButton" onClick={() => props.setPage("start")}>
        Back
      </button>
    </div>
  );
};
