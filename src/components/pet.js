import React, {useState} from 'react';
import {User} from './user.js';
import Status from './status.js';
import Skill from './skill.js';

export class PetStatus extends React.Component {
  render() {
    const status = this.props.pet.status;
    return (
      <>
        <div>xxxxxxxxxxxxxxxxxxxxxxxxx</div>
        <div>Energy: {status.energy}</div>
        <div>Hunger: {status.hunger}</div>
        <div>Hygiene: {status.hygiene}</div>
        <div>Poop: {status.poop}</div>
        <div>xxxxxxxxxxxxxxxxxxxxxxxxx</div>
      </>
    );
  }
}

export class PetSkill extends React.Component {
  render() {
    const skill = this.props.pet.skill;
    return (
      <>
        <div>xxxxxxxxxxxxxxxxxxxxxxxxx</div>
        <div>Strength: {skill.strength}</div>
        <div>Intelligence: {skill.intellegence}</div>
        <div>Art: {skill.art}</div>
        <div>xxxxxxxxxxxxxxxxxxxxxxxxx</div>
      </>
    );
  }
}

export class PetInfo extends React.Component {
  render() {
    const petInfo = this.props.pet;
    return (
      <>
        <div>xxxxxxxxxxxxxxxxxxxxxxxxx</div>
        <div>Name: {petInfo.name}</div>
        <div>Gender: {petInfo.gender}</div>
        <div>Birthday: {petInfo.bday}</div>
        <div>Affection: {petInfo.affection}</div>
        <div>xxxxxxxxxxxxxxxxxxxxxxxxx</div>
      </>
    );
  }
}

export const PetInfoLists = (props) => {
  return (
    <>
      {props.petLists.map(pet =>
        <>
          <PetInfo key={pet.id} pet={pet}/>
          <button
            onClick={() => {props.setPet(pet);}}
          >
            Select {pet.name}
          </button>
        </>
      )}
    </>
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
  const [gender, setGender] = useState('');
  const [bday, setBday] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = props.user;
    props.setUser(new User(user.name, user.gender, user.exp, user.point,
      [...user.pet, new Pet(name, gender, bday)]));
    setName('');
    setGender('');
    setBday('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={gender}
        onChange={event => setGender(event.target.value)}
        placeholder="Gender"
        required
      />
      <input
        type="text"
        value={bday}
        onChange={event => setBday(event.target.value)}
        placeholder="Birthday"
        required
      />
      <button>Add Pet</button>
    </form>
  );
}
