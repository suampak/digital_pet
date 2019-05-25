import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Status from "./status.js";
import Skill from "./skill.js";
import { dateToString } from "./util.js";
import {
  MAXACTION,
  MAXREMAINTIME,
  MAXPARA,
  MAXPET,
  DIFFSKILL,
  DIFFEXP,
  ISREQUIRED
} from "./constant.js";
import { server } from "./routes.js";

import "./../css/style.css";

/* eslint react/prop-types: 0 */

export const PetProfile = props => {
  const user = props.user;
  const handleDelete = () => {
    event.preventDefault();
    props.setPage("menu");
    props.setPet(null);
    props.setUser(user.removePet(props.pet));
    return toast(
      <div>
        {user.name} has abandoned {props.pet.name}
      </div>
    );
  };

  return (
    <div className="background">
      <PetInfo pet={props.pet} />
      <PetSkill pet={props.pet} />
      <PetStatus pet={props.pet} />
      <Action
        setPet={props.setPet}
        pet={props.pet}
        setUser={props.setUser}
        user={user}
      />
      <div className="remainAction">#Actions: {props.pet.actionLimit}</div>
      <div className="remainAction">Time Remains: {props.pet.remainTime}</div>
      <button
        className="backButton"
        onClick={() => {
          props.setPage("menu");
          props.setPet(null);
        }}
      >
        Back
      </button>
      <button className="deleteButton" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export const Action = props => {
  const clickAction = func => {
    props.setPet(func);
    const user = props.user.gainEXP(DIFFEXP).updateTime();
    axios.put(
      `${server}/users?name=${user.name}&password=${user.password}`,
      user
    );
    props.setUser(user);
  };

  return (
    <div>
      <div className="allButtons">
        <button onClick={() => clickAction(props.pet.sleep(DIFFSKILL))}>
          Sleep
        </button>
        <button onClick={() => clickAction(props.pet.eat(DIFFSKILL))}>
          Eat
        </button>
        <button onClick={() => clickAction(props.pet.shower(DIFFSKILL))}>
          Shower
        </button>
        <button onClick={() => clickAction(props.pet.poop(DIFFSKILL))}>
          Poop
        </button>
      </div>
      <div className="allButtons">
        <button onClick={() => clickAction(props.pet.hug(DIFFSKILL))}>
          Hug
        </button>
        <button onClick={() => clickAction(props.pet.exercise(DIFFSKILL))}>
          Exercise
        </button>
        <button onClick={() => clickAction(props.pet.read(DIFFSKILL))}>
          Read
        </button>
        <button onClick={() => clickAction(props.pet.draw(DIFFSKILL))}>
          Draw
        </button>
      </div>
    </div>
  );
};

export class PetStatus extends React.Component {
  render() {
    const status = this.props.pet.status;
    return (
      <ul>
        <li>
          <label>Energy: </label>
          <progress value={status.energy} max={MAXPARA} />
        </li>
        <li>
          <label>Hunger: </label>
          <progress value={status.hunger} max={MAXPARA} />
        </li>
        <li>
          <label>Hygiene: </label>
          <progress value={status.hygiene} max={MAXPARA} />
        </li>
        <li>
          <label>Poop: </label>
          <progress value={status.poop} max={MAXPARA} />
        </li>
      </ul>
    );
  }
}

export class PetSkill extends React.Component {
  render() {
    const skill = this.props.pet.skill;
    return (
      <ul>
        <li>
          <label>Strength: </label>
          <progress value={skill.strength} max={MAXPARA} />
        </li>
        <li>
          <label>Intelligence: </label>
          <progress value={skill.intelligence} max={MAXPARA} />
        </li>
        <li>
          <label>Art: </label>
          <progress value={skill.art} max={MAXPARA} />
        </li>
      </ul>
    );
  }
}

export class PetInfo extends React.Component {
  render() {
    const petInfo = this.props.pet;
    return (
      <ul>
        <li>
          <label>Name: </label>
          {petInfo.name}
        </li>
        <li>
          <label>Type: </label>
          {petInfo.type}
        </li>
        <li>
          <label>Gender: </label>
          {petInfo.gender}
        </li>
        <li>
          <label>Birthday </label>
          {petInfo.bday}
        </li>
        <li>
          <label>Affection: </label>
          <progress
            value={petInfo.affection >= 0 ? petInfo.affection : 0}
            max={MAXPARA}
          />
        </li>
      </ul>
    );
  }
}

export const PetLists = props => {
  let button;
  if (props.numPet < MAXPET) {
    button = <button onClick={() => props.setPage("newPet")}>+</button>;
  }

  return (
    <div className="allButtons">
      {props.petLists.map(pet => (
        <button
          key={pet}
          onClick={() => {
            props.setPage("petInfo");
            props.setPet(pet);
          }}
        >
          {pet.name}
        </button>
      ))}
      {button}
    </div>
  );
};

export class Pet {
  constructor(
    name = "",
    type = "",
    gender = "",
    bday = "",
    affection = 0,
    status,
    skill,
    actionLimit,
    remainTime
  ) {
    this.name = name;
    this.type = type;
    this.gender = gender;
    this.bday = bday || dateToString(new Date());
    this.affection = affection;
    this.status = status || new Status();
    this.skill = skill || new Skill();
    this.actionLimit = actionLimit || MAXACTION;
    this.remainTime = remainTime || MAXREMAINTIME;
  }

  deplete(energyDiff, hungerDiff, hygieneDiff, poopDiff) {
    this.status.deplete(energyDiff, hungerDiff, hygieneDiff, poopDiff);
  }

  depleteAffection(diff) {
    this.affection -= this.status.countExhausted(diff);
  }

  fillSkill(strDiff, intDiff, artDiff) {
    this.skill.fill(strDiff, intDiff, artDiff);
  }

  fillStatus(energyDiff, hungerDiff, hygieneDiff, poopDiff) {
    this.status.fill(energyDiff, hungerDiff, hygieneDiff, poopDiff);
  }

  fillActionLimit(diff) {
    if (this.actionLimit < MAXACTION) {
      if (diff) {
        if (this.remainTime > diff) {
          this.remainTime -= diff;
        } else {
          diff -= this.remainTime;
          const remain = diff % MAXREMAINTIME;
          const addAction = (diff - remain) / MAXREMAINTIME + 1;
          this.actionLimit =
            this.actionLimit + addAction < MAXACTION
              ? this.actionLimit + addAction
              : MAXACTION;
          this.remainTime =
            this.actionLimit < MAXACTION ? remain : MAXREMAINTIME;
        }
      } else {
        this.remainTime--;
        if (this.remainTime === 0) {
          this.actionLimit++;
          this.remainTime = MAXREMAINTIME;
        }
      }
    }
  }

  sleep(energyDiff) {
    this.fillStatus(energyDiff, 0, 0, 0);
    return this;
  }

  eat(hungerDiff) {
    this.fillStatus(0, hungerDiff, 0, 0);
    return this;
  }

  shower(hygieneDiff) {
    this.fillStatus(0, 0, hygieneDiff, 0);
    return this;
  }

  poop(poopDiff) {
    this.fillStatus(0, 0, 0, poopDiff);
    return this;
  }

  hug(affectDiff) {
    if (this.actionLimit > 0) {
      this.affection += affectDiff;
      this.actionLimit--;
    }
    return this;
  }

  exercise(strDiff) {
    if (this.actionLimit > 0) {
      this.fillSkill(strDiff, 0, 0);
      this.actionLimit--;
    }
    return this;
  }

  read(intDiff) {
    if (this.actionLimit > 0) {
      this.fillSkill(0, intDiff, 0);
      this.actionLimit--;
    }
    return this;
  }

  draw(artDiff) {
    if (this.actionLimit > 0) {
      this.fillSkill(0, 0, artDiff);
      this.actionLimit--;
    }
    return this;
  }
}

export const NewPet = props => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Duck");
  const [gender, setGender] = useState("Male");
  const handleSubmit = event => {
    event.preventDefault();
    const user = props.user.addPet(name, type, gender).updateTime();
    axios.put(
      `${server}/users?name=${user.name}&password=${user.password}`,
      user
    );
    props.setUser(user);
    props.setPage("menu");
    setName("");
    setGender("Duck");
    setGender("Male");
    return toast(
      <div>
        {user.name} has added new pet {name}
      </div>
    );
  };

  return (
    <div className="background">
      <form className="petForm" onSubmit={handleSubmit}>
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
          Type:
          <input
            type="radio"
            name="type"
            value="Duck"
            onChange={event => setType(event.target.value)}
            checked={type === "Duck"}
          />
          Duck
          <input
            type="radio"
            name="type"
            value="Rat"
            onChange={event => setType(event.target.value)}
            checked={type === "Rat"}
          />
          Rat
          <input
            type="radio"
            name="type"
            value="Bear"
            onChange={event => setType(event.target.value)}
            checked={type === "Bear"}
          />
          Bear
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
          value="Add New Pet"
        />
      </form>
      <button className="backButton" onClick={() => props.setPage("menu")}>
        Back
      </button>
    </div>
  );
};
