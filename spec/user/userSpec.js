const dbURI = process.env.MONGO_DB_URI;
const should = require('chai').should();
const mongoose = require('mongoose');

var User = require('../../models/user');

describe("User test suite", () => {

  beforeEach((done) => {
    mongoose.Promise = global.Promise;

    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  it('should encrypt the password.', () => {
    let user = new User();
    user.password = 'senhaTeste';
    expect(user.encryptPassword(user.password)).toContain('$2a$05');
  });

  it("should remove from database", (done) => {
    User.findOneAndRemove({
      email: 'brenosc2@hotmail.com'
    }, (err, data) => {
      if (err) return done(err);
      return done();
    });
  });

  it("should save on the database", (done) => {
    const mockedUser = {
      name: 'Kaung Khant',
      city: 'Singapore',
      state: 'Bukit Batok',
      email: 'kaungkhnt@gmail.com',
      password: 'senhaTeste'
    }
    const newUser = new User(mockedUser);

    newUser.password = newUser.encryptPassword('senhaTeste');
    newUser.save((err, result) => {
      if (err) return done(err);
      return done(null, newUser);
    });
  });

});