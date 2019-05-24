import { User } from "./user.js";
import { Pet } from "./pet.js";
import Status from "./status.js";
import Skill from "./skill.js";

export const dateToString = date => {
  return (
    date.getFullYear() +
    "-" +
    twoDigit(date.getMonth()) +
    "-" +
    twoDigit(date.getDate())
  );
};

const twoDigit = num => {
  return (num < 10 ? "0" : "") + num;
};

export const loadUser = userJson => {
  let petList = userJson.pet.map(
    pet =>
      new Pet(
        pet.name,
        pet.type,
        pet.gender,
        pet.bday,
        pet.affection,
        new Status(
          pet.status.energy,
          pet.status.hunger,
          pet.status.hygiene,
          pet.status.poop
        ),
        new Skill(pet.skill.strength, pet.skill.intellgence, pet.skill.art),
        pet.actionLimit,
        pet.remainTime
      )
  );
  return new User(
    userJson.name,
    userJson.password,
    userJson.gender,
    userJson.bday,
    userJson.exp,
    userJson.point,
    petList,
    userJson.timestamp
  );
};
