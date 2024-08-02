import { defineFactorifyConfig } from '@julr/factorify'

// Make sure that piece of code is executed before the tests are run
const disconnect = defineFactorifyConfig({
  database: {
    // See https://knexjs.org/guide/#configuration-options
    // for more information about the possible options
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 8922,
      user: 'test_user',
      password: 'test_password',
      database: 'eco_test',
    }
  },
})



// Once you are done with the tests, you must close the database connection by calling the disconnect function returned by `defineFactorifyConfig`
// For example, in Jest, you can do this in a `afterAll` hook
// afterAll(() => disconnect())
