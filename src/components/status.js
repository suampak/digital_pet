export default class Status {
  constructor(energy = 100, hunger = 100, hygiene = 100, poop = 100) {
    // max: 100 (+), min: 0 (-)
    this.energy = energy;
    this.hunger = hunger;
    this.hygiene = hygiene;
    this.poop = poop;
  }
}
