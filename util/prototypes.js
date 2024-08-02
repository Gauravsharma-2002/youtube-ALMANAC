const multiplyby5 = function (inp) {
  return inp * 5;
};
multiplyby5.power = 2;
multiplyby5.childFunction = function () {
  console.log(this.power);
  console.log("hello child");
  //   return 1
  return 0;
};
multiplyby5.secondChild = function () {
  console.log("inside Second child");
  return 0;
};

// multiplyby5.secondChild().secondChildKaBacha = function () {
//   console(
//     "chacha vidhayak hai hamare ::::: marenge kam ghaseetenge jyadaaa bujheeeee !!!!"
//   );
//   return 0;
// };
// console.log("calling child function", multiplyby5.childFunction());
// console.log(
//   "calling the second child of multplyby5  thing: ",
//   multiplyby5.secondChild()
// );

// console.log(
//   "kya ham pota acces kar sakte hai ",
//   multiplyby5.secondChildKaBacha()
// );

// console.log(multiplyby5(5));
// console.log(multiplyby5.power);
// console.log(multiplyby5);
// console.log(multiplyby5.prototype);

const createUser = function (userName, score) {
  this.userName = userName;
  this.score = score;
};

createUser.prototype.printMe = function () {
  console.log(`hey my score is : ${this.score}`);
  return 0;
};
createUser.prototype.incrementScore = function () {
  return this.score++;
};

const chai = new createUser("chai", 32);
// console.log(createUser.prototype);
// console.log(chai.printMe());

/// prototypel concept

let name = "vivek vishal ";
console.log(name.length);
// your task is to create some function associated with string to find the actual length
// console.log(name.trueLength) something like this

// kahani
let myHeross = ["thor", "spider"];
let heroPower = {
  thor: "hammer",
  spiderman: "shoot",
  getSpiderPower: function () {
    console.log(`spiderPOwer : ${this.spiderman}`);
  },
};

// heres the thing: can we have an arrbitarry method by which i can access with object ?

// no so lets add some superPowered function to all the objects

Object.prototype.vishal = function () {
  console.log(
    `this is the super user function associated with every kind of object `
  );
  console.log(`${this.thor}`); // hard-codded the thor thing
  return 0;
};

/// now check if it is attached to the
heroPower.vishal(); // this calls the heroPower's vishal method which is not implicitly defined in it but besides that it was attached to the most heirarichal rich guy obect now it will spred this method "vishl " to all other thing which are object like "array string etc.."
//   to verify this have the below line
// console.log("checking the prototype", heroPower.prototype); // this returns me the undefined because i had not defined any prototype for it explicitly so need to do so
// heroPower.prototype.konTagda = function () {
//   console.log(`${this.spiderman} wala spiderman`);
//   return 0;
// };
// console.log(heroPower.prototype);

/// INHERITANCE
const user = {
  name: "jaan ke kya karega",
};

const Teacher = {
  maekVideo: true,
};
const TeachingAss = {
  isAvailable: false,
};
const TA = {
  makeAssignment: "js assignnment",
  fullTrue: true,
  __proto__: TeachingAss, /// linking this object with teachingAss
};

/// objects are independet by themselves until linked
// down here is the linking process
// use of Prototype

//or use of __proto__ thing

// this can also be done outside
TeachingAss.__proto__ = user;

// morden thing

Object.setPrototypeOf(TeachingAss, Teacher); // this is also doing the same thing of linking two objects

/// so now make the super function for string
String.prototype.trueLength = function () {
  console.log(`${this}`);
  console.log(`${this.trim().length}`);
  return this.trim().length;
};

const chotaUser = "chotaChetan        ";
const badaChetan = "     badaChetan    ";
console.log("intrimed length", chotaUser.length);
console.log("chotaChetan length", chotaUser.trueLength());
console.log("intrimed length", badaChetan.length);
console.log("chotaChetan length", badaChetan.trueLength());




// call and this and bind and apply 
// function ke andar ka function ka loocha

// khud se yaad kr ke likhna





/// classes ki nautanki
