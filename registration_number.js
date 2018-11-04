module.exports = function (pool) {
  'use strict'
  async function addRegistration(reg) {

    let registNo = reg.substr(0, 3).trim();
    // console.log(registNo)
    let plateResult = await pool.query('SELECT id FROM towns WHERE tag=$1', [registNo]);
    if (plateResult.rowCount > 0) {
      let result = await pool.query('insert into registration_numbers (registration, town_id) values ($1,$2)', [reg, plateResult.rows[0].id])
      // console.log(result);
    }
  }

  async function allTowns() {
    let result = await pool.query('SELECT registration FROM registration_numbers')
    return result.rows
  }

  async function clearRegistration() {
    let result = await pool.query('delete from registration_numbers');
    return result.rowCount;
  }
  // creating an array to push string of the entered tags only
  async function filterBy(tag) {
    if (tag !== "ALL") {
      let validTag = tag.toUpperCase();
      let tag = validTag.substr(0, 2).trim();


      // let registrations = await pool.query('SELECT registration FROM registration_numbers');

      let filterTag = await pool.query('SELECT id FROM towns WHERE tag=$1', [validTag]);
      let townId = filterTag.rows[0].id;
      console.log(townId)
      let filtered = await pool.query('SELECT registration FROM registration_numbers WHERE town_id=$1', [townId]);
      // console.log(filtered)
      return filtered.rows;
    } else {
      await allTowns();
    }
  }

  // async function filterBy(tag) {
  //   let registNo = reg.substr(0, 2).trim();
  //   if (tag === "ALL") {
  //     const registrations = await pool.query('SELECT registration FROM registration_numbers');
  //     // console.log(registrations.rows)
  //     return registrations.rows;
  //   }
  //   for (var i = 0; i <= registrations.length; i++) {

  //     let filterTag = await pool.query('SELECT id FROM towns WHERE tag=$1', [registNo]);
  //     let townId = filterTag.rows[0].id;
  //     let filtered = await pool.query('SELECT registration FROM registration_numbers WHERE town_id=$1', [townId]);
  //     // console.log(filtered);
  //     return filtered.rows;
  //   }
  // }

  return {
    addRegistration,
    filterBy,
    allTowns,
    clearRegistration
  }
}