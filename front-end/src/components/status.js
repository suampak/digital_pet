import { MAXPARA } from "./constant.js";

export default class Status {
  constructor(
    energy = MAXPARA,
    hunger = MAXPARA,
    hygiene = MAXPARA,
    poop = MAXPARA
  ) {
    // max: 100 (+), min: 0 (-)
    this.energy = energy;
    this.hunger = hunger;
    this.hygiene = hygiene;
    this.poop = poop;
  }

  deplete(energyDiff, hungerDiff, hygieneDiff, poopDiff) {
    this.energy = this.energy - energyDiff > 0 ? this.energy - energyDiff : 0;
    this.hunger = this.hunger - hungerDiff > 0 ? this.hunger - hungerDiff : 0;
    this.hygiene =
      this.hygiene - hygieneDiff > 0 ? this.hygiene - hygieneDiff : 0;
    this.poop = this.poop - poopDiff > 0 ? this.poop - poopDiff : 0;
  }

  fill(energyDiff, hungerDiff, hygieneDiff, poopDiff) {
    this.energy =
      this.energy + energyDiff < MAXPARA ? this.energy + energyDiff : MAXPARA;
    this.hunger =
      this.hunger + hungerDiff < MAXPARA ? this.hunger + hungerDiff : MAXPARA;
    this.hygiene =
      this.hygiene + hygieneDiff < MAXPARA
        ? this.hygiene + hygieneDiff
        : MAXPARA;
    this.poop = this.poop + poopDiff < MAXPARA ? this.poop + poopDiff : MAXPARA;
  }

  countExhausted(diff) {
    if (diff) {
      return (
        (this.energy - diff > 0 ? 0 : diff - this.energy) +
        (this.hunger - diff > 0 ? 0 : diff - this.hunger) +
        (this.hygiene - diff > 0 ? 0 : diff - this.hygiene) +
        (this.poop - diff > 0 ? 0 : diff - this.poop)
      );
    }
    return (
      (this.energy > 0 ? 0 : 1) +
      (this.hunger > 0 ? 0 : 1) +
      (this.hygiene > 0 ? 0 : 1) +
      (this.poop > 0 ? 0 : 1)
    );
  }
}
