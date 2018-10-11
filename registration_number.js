
module.exports = function (pool) {
  'use strict'

  async function addRegistration(registNo) {
    // making the first letteer upper case
    // registNo = registNo.charAt(0).toUpperCase() + registNo.slice(1).toLowerCase();

    let plateResult = await pool.query('SELECT id FROM registration_numbers WHERE registration=$1', [registNo.rows[0].id]);
    console.log(plateResult)

    let townResult = await pool.query('SELECT id FROM towns WHERE town=$1', [registNo]);
    if (townResult.rowCount === 0) {

      await pool.query('INSERT into registraion_numbers (town, tag) values ($1, $2)', [registNo]);
    }
  }


  // creating an array to push string of the entered tags only
  async function filterBy(tag) {
    let filtered = [];
    let registrations = Object.keys(regList);
    if (tag === "ALL") {
      return registrations;
    }
    //looping on my strings after they converted
    for (var i = 0; i < registrations.length; i++) {

      if (registrations[i].startsWith(tag)) {
        filtered.push(registrations[i]);
      }
    }
    return filtered;
  }

  return {
    addRegistration,
    filterBy
  }

}
