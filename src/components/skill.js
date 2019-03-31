export default class Skill {
  constructor(strength = 0, intelligence = 0, art = 0) {
    // max: 100 (+), min: 0 (-)
    this.strength = strength;
    this.intelligence = intelligence;
    this.art = art;
  }
}
