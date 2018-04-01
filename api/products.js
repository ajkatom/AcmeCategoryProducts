const express = require("express");
const router = require("express").Router();
const db = require("../db");
const { Product, Category } = db.models;

router.get("/", (req, res, next) => {
  Product.findAll()
    .then(products => {
      products.map(product => {
        Category.findAll().then(categories =>
          product.setCategory(Math.floor(Math.random() * categories.length) + 1)
        );
      });

      res.send(products);
    })
    .catch(next);
});

module.exports = router;
