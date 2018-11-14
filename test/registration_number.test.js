let assert = require("assert");
let registrationFactory = require('../registration_number');
const pg = require("pg");
const Pool = pg.Pool;
// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgres://coder:pg123@localhost:5432/towns';

const pool = new Pool({
  connectionString
});
describe('The registration function Tests', function () {

  beforeEach(async function () {
    await pool.query('delete from registration_numbers');
  });
  it('should return the registration from Bellville.', async function () {

    var registrationObj = registrationFactory(pool);
    await registrationObj.addRegistration('CY 182-547', 'CY');
    assert.deepEqual([{
      registration: 'CY 182-547'
    }], await registrationObj.allTowns());
  });
  it('should return the registration from Cape Town.', async function () {

    var registrationObj = registrationFactory(pool);
    await registrationObj.addRegistration('CA 182-547', 'CA');
    assert.deepEqual([{
      registration: 'CA 182-547'
    }], await registrationObj.allTowns());
  });
  it('should return the registration from Kraaifontain.', async function () {

    var registrationObj = registrationFactory(pool);
    await registrationObj.addRegistration('CF 182-547', 'CF');
    assert.deepEqual([{
      registration: 'CF 182-547'
    }], await registrationObj.allTowns());
  });
  it('should return the registration from George.', async function () {

    var registrationObj = registrationFactory(pool);
    await registrationObj.addRegistration('CJ 182-547', 'CJ');
    assert.deepEqual([{
      registration: 'CJ 182-547'
    }], await registrationObj.allTowns());
  });
  it('should only return the registrations from Kraaifontain.', async function () {

    var registrationObj = registrationFactory(pool);

    await registrationObj.addRegistration('CF 182-337');
    await registrationObj.addRegistration('CF 518-027');
    await registrationObj.addRegistration('CA 418-927');
    await registrationObj.addRegistration('CF 418-827');
    await registrationObj.addRegistration('CJ 418-927');

    assert.deepEqual([{
      registration: 'CF 182-337'
    }, {
      registration: 'CF 518-027'
    }, {
      registration: 'CF 418-827'
    }], await registrationObj.filterBy('CF'));

  });
  it('should only return the registrations from Bellville.', async function () {

    var registrationObj = registrationFactory(pool);

    await registrationObj.addRegistration('CY 182-337');
    await registrationObj.addRegistration('CY 518-027');
    await registrationObj.addRegistration('CA 418-927');
    await registrationObj.addRegistration('CY 418-827');
    await registrationObj.addRegistration('CJ 418-927');

    assert.deepEqual([{
      registration: 'CY 182-337'
    }, {
      registration: 'CY 518-027'
    }, {
      registration: 'CY 418-827'
    }], await registrationObj.filterBy('CY'));

  });


});