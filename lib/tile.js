export default class tile {
  constructor(value, merged, isNew, movedFrom, pos, prevPos, id, mergedFrom) {
    this.value = value;
    this.merged = merged;
    this.isNew = isNew;
    this.mergedFrom = mergedFrom;
    this.movedFrom = movedFrom;
    this.pos = pos;
    this.prevPos = prevPos;
    this.id = id;
  }
}
