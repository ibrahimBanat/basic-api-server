'use strict';
const express = require('express');
const Food = require('../models/food');
const food = new Food();
let router = express.Router();

router.post('/', createFood);
router.get('/', readFood);
router.get('/:id', readSpecificFood);
router.put('/:id', updateFood);
router.delete('/:id', deletFood);

//functions
function createFood(req, res) {
  let foodObject = req.body;
  console.log(req.body);
  let resObject = food.create(foodObject);
  res.status(201).json(resObject);
}
function readFood(req, res) {
  const resObject = food.read();
  res.json(resObject);
}
function readSpecificFood(req, res) {
  let id = req.params.id;
  let resObject = food.read(id);
  res.json(resObject);
}
function updateFood(req, res) {
  let foodObj = req.body;
  let id = req.params.id;
  let resObject = food.update(id, foodObj);
  res.json(resObject);
}
function deletFood(req, res) {
  let id = req.params.id;
  let resObject = food.delete(id);
  res.json(resObject);
}

module.exports = router;
