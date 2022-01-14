const chalk = require('chalk');

const getShopInfo = require('./api/shop');
const getAllProducts = require('./api/products');
const getAllCollections = require('./api/collections');
const getAllPages = require('./api/pages');
const getAllArticles = require('./api/articles');

(async () => {
  console.log(chalk.yellow.bold(`SHOPIFY:GETTING SHOP INFO`))
  console.log(chalk.yellow.bold(`SHOPIFY:GETTING PRODUCTS`))
  console.log(chalk.yellow.bold(`SHOPIFY:GETTING COLLECTIONS`))
  console.log(chalk.yellow.bold(`SHOPIFY:GETTING PAGES`))
  console.log(chalk.yellow.bold(`SHOPIFY:GETTING ARTICLES`))

  const shop = await getShopInfo()
  const products = await getAllProducts()
  const collections = await getAllCollections()
  const pages = await getAllPages()
  const articles = await getAllArticles()

  // Do some sort of mapping to add product data to collections

  console.log(chalk.greenBright.bold(`SHOPIFY:SUCCESSFULLY RETRIEVED ${shop.name.toUpperCase()} INFO`))
  console.log(chalk.greenBright.bold(`SHOPIFY:SUCCESSFULLY RETRIEVED ${products.length} PRODUCT${products.length > 1 || products.length == 0 ? 'S' : ''}`))
  console.log(chalk.greenBright.bold(`SHOPIFY:SUCCESSFULLY RETRIEVED ${collections.length} COLLECTIONS`))
  console.log(chalk.greenBright.bold(`SHOPIFY:SUCCESSFULLY RETRIEVED ${pages.length} PAGE${pages.length > 1 || pages.length == 0 ? 'S' : ''}`))
  console.log(chalk.greenBright.bold(`SHOPIFY:SUCCESSFULLY RETRIEVED ${articles.length} ARTICLE${articles.length > 1 || articles.length == 0 ? 'S' : ''}`))

  console.log(chalk.yellow.bold(`SHOPIFY:MAPPING PRODUCTS TO COLLECTIONS`))

  collections.map(collection => {
    if (collection.products.length > 0) {
      return collection.products.map(collectionProduct => {
        const foundProduct = products.filter(product => {
          return product.id === collectionProduct.id
        })
        return foundProduct[0]
      })
    } else {
      return collection
    }
  })

  console.log(chalk.greenBright.bold(`SHOPIFY:SUCCESSFULLY MAPPED PRODUCTS TO COLLECTIONS`))

})()