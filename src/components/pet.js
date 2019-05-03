import React, {useState} from 'react';
import {User} from './user.js';
import Status from './status.js';
import Skill from './skill.js';
import {MAXACTION, MAXREMAINTIME, MAXPARA, DIFFSTATUS, DIFFSKILL, DIFFEXP} from './constant.js'

export const PetProfile = (props) => {
  const user = props.user;
  const handleDelete = () => {
    props.setPet('menu');
    props.setUser(user.removePet(props.pet));
  };

  return (
    <div>
      <PetInfo pet={props.pet}/>
      <PetSkill pet={props.pet}/>
      <PetStatus pet={props.pet}/>
      <button onClick={() => props.setPet('menu')}>Menu</button>
      <button onClick={handleDelete}>Delete</button>
      <Action setPet={props.setPet} pet={props.pet} setUser={user} user={user}/>
      <div>#Actions: {props.pet.actionLimit}</div>
      <div>Time Remains: {props.pet.remainTime}</div>
    </div>
  )
}

export const Action = (props) => {
  const clickAction = (func) => {
    props.setPet(func);
    props.setUser(props.user.gainEXP(DIFFEXP));
  }

  return (
    <div>
      <button onClick={() => clickAction(props.pet.sleep(DIFFSKILL))}>Sleep</button>
      <button onClick={() => clickAction(props.pet.eat(DIFFSKILL))}>Eat</button>
      <button onClick={() => clickAction(props.pet.shower(DIFFSKILL))}>Shower</button>
      <button onClick={() => clickAction(props.pet.poop(DIFFSKILL))}>Poop</button>
      <button onClick={() => clickAction(props.pet.hug(DIFFSKILL))}>Hug</button>
      <button onClick={() => clickAction(props.pet.exercise(DIFFSKILL))}>Exercise</button>
      <button onClick={() => clickAction(props.pet.read(DIFFSKILL))}>Read Book</button>
      <button onClick={() => clickAction(props.pet.draw(DIFFSKILL))}>Draw Picture</button>
    </div>
  )
}

export class PetStatus extends React.Component {
  render() {
    const status = this.props.pet.status;
    return (
      <ul>
        <li><label>Energy: </label><progress value={status.energy} max={MAXPARA}></progress></li>
        <li><label>Hunger: </label><progress value={status.hunger} max={MAXPARA}></progress></li>
        <li><label>Hygiene: </label><progress value={status.hygiene} max={MAXPARA}></progress></li>
        <li><label>Poop: </label><progress value={status.poop} max={MAXPARA}></progress></li>
      </ul>
    );
  }
}

export class PetSkill extends React.Component {
  render() {
    const skill = this.props.pet.skill;
    return (
      <ul>
        <li><label>Strength: </label><progress value={skill.strength} max={MAXPARA}></progress></li>
        <li><label>Intelligence: </label><progress value={skill.intelligence} max={MAXPARA}></progress></li>
        <li><label>Art: </label><progress value={skill.art} max={MAXPARA}></progress></li>
      </ul>
    );
  }
}

export class PetInfo extends React.Component {
  render() {
    const petInfo = this.props.pet;
    return (
      <ul>
        <li><label>Name: </label>{petInfo.name}</li>
        <li><label>Type: </label>{petInfo.type}</li>
        <li><label>Gender: </label>{petInfo.gender}</li>
        <li><label>Birthday </label>{petInfo.bday}</li>
        <li><label>Affection: </label><progress value={petInfo.affection >= 0 ? petInfo.affection : 0} max={MAXPARA}></progress></li>
      </ul>
    );
  }
}

export const PetLists = (props) => {
  return (
    <div>
      {props.petLists.map(pet =>
        <button onClick={() => {props.setPet(pet);}}>{pet.name}</button>
      )}
    </div>
  );
}

export class Pet {
  constructor(name = '', type = '', gender = '', bday = '', affection = 0, status, skill) {
    this.name = name;
    this.type = type;
    this.gender = gender;
    this.bday = bday;
    this.affection = affection;
    this.status = status || new Status();
    this.skill = skill || new Skill;
    this.actionLimit = MAXACTION;
    this.remainTime = MAXREMAINTIME;
  }

  deplete(energyDiff, hungerDiff, hygieneDiff, poopDiff) {
    this.status.deplete(energyDiff, hungerDiff, hygieneDiff, poopDiff);
  }

  depleteAffection() {
    this.affection -= this.status.countExhausted();
  }

  fillSkill(strDiff, intDiff, artDiff) {
    this.skill.fill(strDiff, intDiff, artDiff);
  }

  fillStatus(energyDiff, hungerDiff, hygieneDiff, poopDiff) {
    this.status.fill(energyDiff, hungerDiff, hygieneDiff, poopDiff);
  }

  fillActionLimit() {
    if(this.actionLimit < MAXACTION) {
      this.remainTime--;
      if(this.remainTime === 0) {
        this.actionLimit++;
        this.remainTime = MAXREMAINTIME;
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
    if(this.actionLimit > 0) {
      this.affection += affectDiff;
      this.actionLimit--;
    }
    return this;
  }

  exercise(strDiff) {
    if(this.actionLimit > 0) {
      this.fillSkill(strDiff, 0, 0);
      this.actionLimit--;
    }
    return this;
  }

  read(intDiff) {
    if(this.actionLimit > 0) {
      this.fillSkill(0, intDiff, 0);
      this.actionLimit--;
    }
    return this;
  }

  draw(artDiff) {
    this.fillSkill(0, 0, artDiff);
    this.actionLimit--;
    return this;
  }
}

export const NewPet = (props) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Duck')
  const [gender, setGender] = useState('Male');
  const [bday, setBday] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = props.user;
    props.setUser(user.addPet(name, type, gender, bday));
    props.setPet('menu');
    setName('');
    setGender('Duck');
    setGender('Male');
    setBday('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="Your Name"
            required
          />
        </label>
        <br/>

        <label>Type:
          <input
            type="radio"
            name="type"
            value="Duck"
            onChange={event => setType(event.target.value)}
            checked={type === "Duck"}
          />Duck
          <input
            type="radio"
            name="type"
            value="Rat"
            onChange={event => setType(event.target.value)}
            checked={type === "Rat"}
          />Rat
          <input
            type="radio"
            name="type"
            value="Bear"
            onChange={event => setType(event.target.value)}
            checked={type === "Bear"}
          />Bear
        </label>
        <br/>

        <label>Gender:
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={event => setGender(event.target.value)}
            checked={gender === "Male"}
          />Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={event => setGender(event.target.value)}
            checked={gender === "Female"}
          />Female
        </label>
        <br/>

        <label>Date:
          <input
            type="date"
            name="bday"
            value={bday}
            min="1900-01-01"
            max="2030-01-01"
            onChange={event => setBday(event.target.value)}
            required
          />
        </label>
        <br/>

        <input
          type="submit"
          name="submit"
          value="Add New Pet"
        />
      </form>
      <button onClick={() => props.setPet('menu')}>Menu</button>
    </div>
  );
}
