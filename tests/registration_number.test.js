describe('The registration function Tests', function() {

  it('should return false if registration is empty.', function() {
    var registrationObj = RegistrationFactory();
    var registNo = ""
    assert.deepEqual(registrationObj.addRegistration(registNo), false)
  });
  // it('should return true if registration is valid. ', function() {
  //   var registrationObj = RegistrationFactory();
  //   var registNo = "CA 1827"
  //   assert.deepEqual(registrationObj.addRegistration(registNo), true)
  // });

  it('should return all the registration from the map.', function() {

    var registrationObj = RegistrationFactory();

    registrationObj.addRegistration('CA 1827');
    registrationObj.addRegistration('CF 1827');
    registrationObj.addRegistration('CY 1827');
    registrationObj.addRegistration('CJ 1827');

    assert.deepEqual({'CA 1827':0, 'CF 1827':0,'CY 1827':0,'CJ 1827':0},registrationObj.getMap())
  });
  it('should return the registrations from Cape Town.', function() {

    var registrationObj = RegistrationFactory();

    registrationObj.addRegistration('CA 1827');
    registrationObj.addRegistration('CA 51827');
    registrationObj.addRegistration('CA 41827');

    assert.deepEqual(['CA 1827','CA 51827','CA 41827'],registrationObj.filterBy('CA'));
  });
  it('should return the registrations from Kraaifontain.', function() {

    var registrationObj = RegistrationFactory();

    registrationObj.addRegistration('CF 1827');
    registrationObj.addRegistration('CF 51827');
    registrationObj.addRegistration('CA 41827');
    registrationObj.addRegistration('CF 41827');
    registrationObj.addRegistration('CJ 41827');

    assert.deepEqual(['CF 1827','CF 51827','CF 41827'],registrationObj.filterBy('CF'));
  });


});
