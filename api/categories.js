const express = require("express");
const router = require("express").Router();
const db = require("../db");
const { Category } = db.models;

router.get("/", (req, res, next) => {
  Category.findAll()
    .then(categories => {
      res.send(categories);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Category.create(req.body)
    .then(category => res.send(category))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  Category.findById(req.params.id)
    .then(category => category.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
