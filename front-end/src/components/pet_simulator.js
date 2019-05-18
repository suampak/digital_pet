import React, { useState, useEffect } from "react";
import UserInfo, { NewUser } from "./user.js";
import { PetLists, PetProfile, NewPet } from "./pet.js";

/* eslint react/prop-types: 0 */

export default function PetSimulator() {
  const [user, setUser] = useState(null);
  const [pet, setPet] = useState("menu"); // select the page
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTime(time + 1);
      setUser(
        user
          .depleteAll()
          .fillActionLimitAll()
          .depleteAffectionAll()
      );
    }, 1000);
    return () => clearTimeout(timerId);
  });

  let selPage;

  if (user === null) {
    selPage = <NewUser setUser={setUser} setTime={setTime} />;
  } else if (pet === "menu") {
    selPage = (
      <Menu setUser={setUser} user={user} setPet={setPet} time={time} />
    );
  } else if (pet === "newPet") {
    selPage = <NewPet setUser={setUser} user={user} setPet={setPet} />;
  } else {
    selPage = (
      <PetProfile setUser={setUser} user={user} setPet={setPet} pet={pet} />
    );
  }

  return <div>{selPage}</div>;
}

const Menu = props => {
  return (
    <div className="background">
      <UserInfo user={props.user} />
      <PetLists
        petLists={props.user.pet}
        setPet={props.setPet}
        numPet={props.user.pet.length}
      />
      <div className="time">Total Play Time: {props.time} s</div>
    </div>
  );
};
