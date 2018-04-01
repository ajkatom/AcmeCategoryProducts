const Product = require("./product");
const Category = require("./category");
const conn = require("./conn");
const faker = require("faker");
const random = require("generate-random-data");

const productsToSeed = [
  { name: faker.commerce.productName() },
  { name: faker.commerce.productName() },
  { name: faker.commerce.productName() }
];

const catagoriesToSeed = [
  { name: random.domain() },
  { name: random.domain() },
  { name: random.domain() }
];

const sync = () => {
  return conn.sync({ force: true });
};

const seed = () => {
  return Promise.all(
    catagoriesToSeed.map(category => {
      Category.create(category);
    })
  ).then(() =>
    Promise.all(
      productsToSeed.map(product => {
        Product.create(product);
      })
    )
  );
};

Product.belongsTo(Category, { onDelete: "cascade" });
Category.hasMany(Product);

module.exports = {
  sync,
  seed,
  models: {
    Product,
    Category
  }
};
