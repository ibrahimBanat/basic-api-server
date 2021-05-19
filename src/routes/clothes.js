'use strict';
const express = require('express');
const Clothes = require('../models/clothes');
const clothes = new Clothes();
let router = express.Router();

router.post('/', createclothes);
router.get('/', readclothes);
router.get('/:id', readSpecificclothes);
router.put('/:id', updateclothes);
router.delete('/:id', deletclothes);

//functions
function createclothes(req, res) {
  let clothesObject = req.body;
  console.log(req.body);
  let resObject = clothes.create(clothesObject);
  res.status(201).json(resObject);
}
function readclothes(req, res) {
  const resObject = clothes.read();
  res.json(resObject);
}
function readSpecificclothes(req, res) {
  let id = req.params.id;
  let resObject = clothes.read(id);
  res.json(resObject);
}
function updateclothes(req, res) {
  let clothesObj = req.body;
  let id = req.params.id;
  let resObject = clothes.update(id, clothesObj);
  res.json(resObject);
}
function deletclothes(req, res) {
  let id = req.params.id;
  let resObject = clothes.delete(id);
  res.json(resObject);
}

module.exports = router;
