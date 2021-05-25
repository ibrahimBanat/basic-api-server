'use strict';
const uuid = require('uuid').v4;
class food {
  constructor() {
    this.db = [];
  }

  create(obj) {
    const food = {
      id: uuid(),
      data: obj,
    };
    this.db.push(food);
    return food;
  }
  read(id) {
    if (id) {
      return this.db.find(item => item.id === id);
    }
    return this.db;
  }
  update(id, foodObj) {
    let x;
    this.db.forEach(item => {
      if (item.id == id) {
        item.data = foodObj;
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

module.exports = food;
