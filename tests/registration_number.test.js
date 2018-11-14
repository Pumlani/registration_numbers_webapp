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

  it('should return false if registration is empty.', async function () {
    var registrationObj = registrationFactory(pool);
    var registNo = ""
    assert.deepEqual(await registrationObj.addRegistration(registNo), false)
  });

  // it('should return all the registration from the map.', async function() {

  //   var registrationObj = registrationFactory();

  //   await registrationObj.addRegistration('CA 182-237');
  //   await registrationObj.addRegistration('CF 182-123');
  //   await registrationObj.addRegistration('CY 187-899');
  //   await registrationObj.addRegistration('CJ 182-566');

  //   assert.deepEqual()
  // });
  it('should return the registrations from Cape Town.', async function () {

    var registrationObj = registrationFactory(pool);
    await registrationObj.addRegistration('CA 182-547');

    assert.deepEqual('CA 182-547', registrationObj.filterBy('CA'));
  });
  // it('should return the registrations from Kraaifontain.', async function() {

  //   var registrationObj = registrationFactory();

  //   registrationObj.addRegistration('CF 1827');
  //   registrationObj.addRegistration('CF 51827');
  //   registrationObj.addRegistration('CA 41827');
  //   registrationObj.addRegistration('CF 41827');
  //   registrationObj.addRegistration('CJ 41827');

  //   assert.deepEqual(['CF 1827','CF 51827','CF 41827'],registrationObj.filterBy('CF'));
  // });


});