import {MAXPARA} from './constant.js'

export default class Status {
  constructor(energy = MAXPARA, hunger = MAXPARA, hygiene = MAXPARA, poop = MAXPARA) {
    // max: 100 (+), min: 0 (-)
    this.energy = energy;
    this.hunger = hunger;
    this.hygiene = hygiene;
    this.poop = poop;
  }

  deplete(energyDiff, hungerDiff, hygieneDiff, poopDiff) {
    this.energy -= energyDiff;
    this.hunger -= hungerDiff;
    this.hygiene -= hygieneDiff;
    this.poop -= poopDiff;
  }

  fill(energyDiff, hungerDiff, hygieneDiff, poopDiff) {
    this.energy += energyDiff;
    this.hunger += hungerDiff;
    this.hygiene += hygieneDiff;
    this.poop += poopDiff;
  }

  countExhausted() {
    return (this.energy > 0 ? 0 : 1) +
           (this.hunger > 0 ? 0 : 1) +
           (this.hygiene > 0 ? 0 : 1) +
           (this.poop > 0 ? 0 : 1);
  }
}
