// THIS ARRAY WAS DONE IN A SEPERATE FILE TO AVOID CIRCULAR DEPENDENCIES
// Models
const User = require('./models/User');
const LifeCoach = require('./models/LifeCoach');
const Member = require('./models/Member');
const Partner = require('./models/Partner');
const Admin = require('./models/Admin');
const Review = require('./models/Reviews');
// Data for each user type

const admin = new Admin(
  'youssef',
  new Date('3/31/1998'),
  'male',
  new Date('4/4/2001'),
  2500,
  'test@gmail.com',
  true
);

const partner = new Partner(
  'oracle',
  'st90',
  'oracle@gmail.com',
  '124553',
  '02396243',
  [],
  ["IBM"],
  'Databases',
  ['Oracle DB'],
  []
);
const partnerUser = new User('partner',partner,"ehw");
const member = new Member(
  'philip',
  new Date('3/31/1997'),
  'female',
  new Date('5/5/2005'),
  'ff@yahoo.com',
  ['web', 'java', 'asp'],
  ['frontend', 'AI'],
  [new Review(partnerUser,"tohfaaa","3",new Date())]
);
const lifeCoach = new LifeCoach(
  'Aly Mazhar',
  new Date('3/4/1990'),
  'male',
  new Date('5/5/2001'),
  20.5,
  'test@hotmail.com',
  []
);
// initializing array of users [To be used in all sub routes]

const users = [
  new User('admin', admin, 'sss'),
  new User('member', member, 'ssss'),
  partnerUser,
  new User('lifeCoach', lifeCoach, 'sff')
];
module.exports = users;
