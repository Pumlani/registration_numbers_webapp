
module.exports = function (pool) {
  'use strict'
  async function addRegistration(reg) {

    let registNo = reg.substr(0, 3).trim();
    // console.log(registNo)
    let plateResult = await pool.query('SELECT id FROM towns WHERE towns.tag=$1', [registNo]);
    if (plateResult.rowCount > 0) {
      await pool.query('insert into registration_numbers (registration, town_id) values ($1,$2)', [reg, plateResult.rows[0].id])
    }
    // console.log(plateResult);
  }
  async function allTowns() {
    let result = await pool.query('SELECT registration FROM registration_numbers')
    return result.rows
  }

  async function filterBy(tag) {
    // let filtered = [];

    let registrations = await pool.query('SELECT registration FROM registration_numbers');
    if (tag === "ALL") {
      return registrations.rows;
    }
    let registNo = reg.substr(0, 3).trim();
    let filter = await pool.query('SELECT id FROM towns WHERE town.tag=$1', [registNo]);

    let filtered = await pool.query('SELECT registration FROM registration_numbers WHERE town_id=$1', [filter.rows[0].id]);
    Console.log(filtered);
    return filtered.rows;
  }

  return {
    addRegistration,
    filterBy,
    allTowns
  }
}
