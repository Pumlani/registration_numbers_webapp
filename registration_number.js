module.exports = function (pool) {
  'use strict'
  async function addRegistration(reg) {
    let registNo = reg.substr(0, 3).trim();
    // console.log(registNo)
    let exist = await doesExist(reg)
    if (!exist) {
      let message = validate(reg)
      if (!message) {
        return message
      } else {
        let plateResult = await pool.query('SELECT id FROM towns WHERE tag=$1', [registNo]);
        let plate = await pool.query('SELECT * FROM registration_numbers WHERE registration=$1', [registNo]);
        if (plate.rowCount === 0) {
          let result = await pool.query('insert into registration_numbers (registration, town_id) values ($1,$2)', [reg, plateResult.rows[0].id])
        }
      }

    } else {
      return 'does exist'
    }
  }

  async function doesExist(reg) {
    let result = await pool.query('select * from registration_numbers where registration=$1', [reg]);
    if (result.rowCount === 0) {
      return false;
    } else {
      return true;
    }
  }

  async function validate(plate) {
    if (plate.length >= 8) {
      return "too long"
    }
  }

  async function allTowns() {
    let result = await pool.query('SELECT registration FROM registration_numbers')
    console.log('lapha', result.rows)
    return result.rows
  }
  async function eachTowns() {
    let result = await pool.query('SELECT * FROM towns')
    return result.rows
  }

  async function clearRegistration() {
    let result = await pool.query('delete from registration_numbers');
    return result.rowCount;
  }
  async function filterBy(tag) {
    let registNo = tag.substr(0, 2).trim();
    if (tag === "ALL") {
      let registrations = await pool.query('SELECT registration FROM registration_numbers');
      return registrations.rows;
    }
    let filterTag = await pool.query('SELECT id FROM towns WHERE tag=$1', [registNo]);
    let townId = filterTag.rows[0].id;
    let filtered = await pool.query('SELECT registration FROM registration_numbers WHERE town_id=$1', [townId]);
    console.log(filtered.rows);
    return filtered.rows;
  }

  return {
    addRegistration,
    filterBy,
    allTowns,
    clearRegistration,
    eachTowns,
    validate
  }
}