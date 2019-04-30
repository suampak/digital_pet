import React, {useState} from 'react';
import {User} from './user.js';
import Status from './status.js';
import Skill from './skill.js';

export const PetProfile = (props) => {
  const user = props.user;
  const handleDelete = () => {
    props.setPet('menu');
    user.pet.splice(user.pet.indexOf(props.pet),1);
    props.setUser(new User(user.name, user.gender, user.exp, user.point,
      user.pet));
  };

  return (
    <div>
      <PetInfo pet={props.pet}/>
      <PetSkill pet={props.pet}/>
      <PetStatus pet={props.pet}/>
      <button onClick={() => props.setPet('menu')}>Menu</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export class PetStatus extends React.Component {
  render() {
    const status = this.props.pet.status;
    return (
      <ul>
        <li><label>Energy: </label><progress value={status.energy} max="100"></progress></li>
        <li><label>Hunger: </label><progress value={status.hunger} max="100"></progress></li>
        <li><label>Hygiene: </label><progress value={status.hygiene} max="100"></progress></li>
        <li><label>Poop: </label><progress value={status.poop} max="100"></progress></li>
      </ul>
    );
  }
}

export class PetSkill extends React.Component {
  render() {
    const skill = this.props.pet.skill;
    return (
      <ul>
        <li><label>Strength: </label><progress value={skill.strength} max="100"></progress></li>
        <li><label>Intelligence: </label><progress value={skill.intelligence} max="100"></progress></li>
        <li><label>Art: </label><progress value={skill.art} max="100"></progress></li>
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
        <li><label>Gender: </label>{petInfo.gender}</li>
        <li><label>Birthday </label>{petInfo.bday}</li>
        <li><label>Affection: </label><progress value={petInfo.affection} max="100"></progress></li>
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
  constructor(name = '', gender = '', bday = '', affection = 0, status, skill) {
    this.name = name;
    this.gender = gender;
    this.bday = bday;
    this.affection = affection;
    this.status = status || new Status();
    this.skill = skill || new Skill();
  }
}

export const NewPet = (props) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');
  const [bday, setBday] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = props.user;
    props.setUser(new User(user.name, user.gender, user.exp, user.point,
      [...user.pet, new Pet(name, gender, bday)]));
    setName('');
    setGender('Male');
    setBday('');
    props.setPet('menu');
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
