import { MAXPARA } from "./constant.js";

export default class Skill {
  constructor(strength = 0, intelligence = 0, art = 0) {
    // max: 100 (+), min: 0 (-)
    this.strength = strength;
    this.intelligence = intelligence;
    this.art = art;
  }

  fill(strDiff, intDiff, artDiff) {
    this.strength =
      this.strength + strDiff < MAXPARA ? this.strength + strDiff : MAXPARA;
    this.intelligence =
      this.intelligence + intDiff < MAXPARA
        ? this.intelligence + intDiff
        : MAXPARA;
    this.art = this.art + artDiff < MAXPARA ? this.art + artDiff : MAXPARA;
  }
}
