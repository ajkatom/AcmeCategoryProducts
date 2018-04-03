const express = require("express");
const router = require("express").Router();
const db = require("../db");
const { Product, Category } = db.models;

router.get("/", (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});
router.post("/", (req, res, next) => {
  Product.create(req.body)
    .then(products => res.send(products))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
