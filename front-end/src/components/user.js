import React, { useState } from "react";
import { toast } from "react-toastify";
import { Pet } from "./pet.js";
import { MAXPARA, DIFFSTATUS, LOWERBOUND, ISREQUIRED } from "./constant.js";

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
  constructor(name = "", gender = "", exp = 0, point = 0, pet = []) {
    this.name = name;
    this.gender = gender;
    this.exp = exp;
    this.point = point;
    this.pet = pet;
  }

  addPet(name, type, gender, bday) {
    this.pet.push(new Pet(name, type, gender, bday));
    return this;
  }

  removePet(pet) {
    this.pet.splice(this.pet.indexOf(pet), 1);
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
}

export const NewUser = props => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const handleSubmit = event => {
    event.preventDefault();
    props.setUser(new User(name, gender));
    props.setTime(0);
    setName("");
    setGender("Male");
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

        <input
          className="confirmButton"
          type="submit"
          name="submit"
          value="Create User"
        />
      </form>
    </div>
  );
};
