import React, {useState} from 'react';

export default class UserInfo extends React.Component {
  render() {
    const userInfo = this.props.user;
    return (
      <>
        <div>xxxxxxxxxxxxxxxxxxxxxxxxx</div>
        <div>Name: {userInfo.name}</div>
        <div>Gender: {userInfo.gender}</div>
        <div>EXP: {userInfo.exp}</div>
        <div>Points: {userInfo.point}</div>
        <div>xxxxxxxxxxxxxxxxxxxxxxxxx</div>
      </>
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
  const [gender, setGender] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    props.setUser(new User(name, gender));
    setName('');
    setGender('');
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
      <button>Add User</button>
    </form>
  );
}
