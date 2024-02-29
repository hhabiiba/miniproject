/**
 * Provide the path to your test currency model, this model will be exactly the same as your Currency model, except...
 * It will not require the connection to Country.
 */
const testCurrency = require('../../models/testCurrency'); // Path to your TEST currency


/**
 * We need to initialize our test tables, so we will write variables to store our initial database state,
 * as well as some helper functions that can be used in our tests!
 */

const initialCurrencies = [
  {
    id: 1, 
    currencyCode: 'CDN',
    conversionRate: 1
  },
  {
    id: 2,
    currencyCode: 'USD',
    conversionRate: 0.75
  }
]

// Returns all currencies from the DB table
const currenciesInDb = async () => {
  const testCurrencies = await testCurrency.findAll({})
  return testCurrencies.map(currency => currency.toJSON())
}

// Initialize table
const init = async () => {
  await testCurrency.sync()
};

// Perform a bulk write
const load = async () => {
  await testCurrency.bulkCreate(initialCurrencies)
}


// Clears all test tables in the database
const clearData = async () => {
  await testCurrency.destroy({
    where: {},
    truncate: true
  })
}

module.exports = {
  initialCurrencies,
  currenciesInDb,
  init,
  load,
  clearData
}
