import React, {useState} from 'react';
import UserInfo, {User, NewUser} from './user.js';
import {PetLists, PetProfile, PetInfo, PetSkill, PetStatus, NewPet} from './pet.js';

export default function PetSimulator() {
  const [user, setUser] = useState(null);
  const [pet, setPet] = useState('menu'); // select the page

  let selPage;

  if(user === null) {
    selPage = <NewUser setUser={setUser}/>;
  } else if(pet === 'menu') {
    selPage = <Menu setUser={setUser} user={user} setPet={setPet}/>;
  } else if(pet === 'newPet') {
    selPage = <NewPet setUser={setUser} user={user} setPet={setPet}/>;
  } else {
    selPage = <PetProfile setUser={setUser} user={user} setPet={setPet} pet={pet}/>
  }

  return (
    <div>
      {selPage}
    </div>
  );
}

const Menu = (props) => {
  return (
    <div>
      <UserInfo user={props.user}/>
      <PetLists petLists={props.user.pet} setPet={props.setPet}/>
      <button onClick={() => props.setPet('newPet')}>Add New Pet</button>
    </div>
  );
}
