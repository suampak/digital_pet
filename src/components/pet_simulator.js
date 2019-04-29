import React, {useState} from 'react';
import UserInfo, {User, NewUser} from './user.js';
import {PetInfoLists, PetInfo, PetSkill, PetStatus, NewPet} from './pet.js';

export default function PetSimulator() {
  const [user, setUser] = useState(new User());
  const [pet, setPet] = useState(null);
  return (
    <>
      {pet === null ?
        <Menu setUser={setUser} user={user} setPet={setPet}/> :
        <PetRoom setPet={setPet} pet={pet}/>
      }
    </>
  );
}

const Menu = (props) => {
  return (
    <div>
      <NewUser setUser={props.setUser}/>
      <UserInfo user={props.user}/>
      <PetInfoLists petLists={props.user.pet} setPet={props.setPet}/>
      <NewPet setUser={props.setUser} user={props.user}/>
    </div>
  );
}

const PetRoom = (props) => {
  return (
    <div>
      <PetInfo pet={props.pet}/>
      <PetSkill pet={props.pet}/>
      <PetStatus pet={props.pet}/>
      <button onClick={() => props.setPet(null)}>Menu</button>
    </div>
  )

}
