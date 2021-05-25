'use strict';
const uuid = require('uuid').v4;

class Clothes {
  constructor() {
    this.db = [];
  }

  create(obj) {
    const clothes = {
      id: uuid(),
      data: obj,
    };
    this.db.push(clothes);
    return clothes;
  }
  read(id) {
    if (id) {
      return this.db.find(item => item.id === id);
    }
    return this.db;
  }
  update(id, clothesObj) {
    let x;
    this.db.forEach(item => {
      if (item.id == id) {
        item.data = clothesObj;
        x = item;
      }
    });
    return x;
  }
  delete(id) {
    this.db = this.db.filter(item => item.id !== id);
    return this.db;
  }
}

module.exports = Clothes;
