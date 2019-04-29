import React, {useState} from 'react';

export default class UserInfo extends React.Component {
  render() {
    const userInfo = this.props.user;
    return (
      <ul>
        <li><label>Name: </label>{userInfo.name}</li>
        <li><label>Gender: </label>{userInfo.gender}</li>
        <li><label>EXP: </label><progress value={userInfo.exp} max="100"></progress></li>
        <li><label>Points: </label><progress value={userInfo.point} max="100"></progress></li>
      </ul>
    );
  }
}

export class User {
  constructor(name = '', gender = '', exp = 0, point = 0, pet = []) {
    this.name = name;
    this.gender = gender;
    this.exp = exp;
    this.point = point;
    this.pet = pet;
  }
}

export const NewUser = (props) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');
  const handleSubmit = (event) => {
    event.preventDefault();
    props.setUser(new User(name, gender));
    setName('');
    setGender('Male');
  };

  return (
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

      <input
        type="submit"
        name="submit"
        value="Create User"
      />
    </form>
  );
}
