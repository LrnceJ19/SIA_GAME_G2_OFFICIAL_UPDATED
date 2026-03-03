let accntNum = 0;
let userList, passList, emailList, coinList, totalCorrectList, levelsMasteredList;
let easyList, mediumList, hardList, scoreList;

getAccountList();

let savedUsernames = userList;
let savedPasswords = passList;
let savedEmails = emailList;

let savedCoins = coinList;
let savedTotalCorrect = totalCorrectList;
let savedLevelsMastered = levelsMasteredList;

let savedEasy = easyList;
let savedMedium = mediumList;
let savedHard = hardList;

let savedScore = scoreList;

if (savedUsernames.length == 0 && savedPasswords.length == 0) {
  savedUsernames.push("admin");
  savedPasswords.push("root");
  savedEmails.push("admin@gmail.com");
  
  savedCoins.push("100000");
  savedTotalCorrect.push("0");
  savedLevelsMastered.push("0");
  
  savedEasy.push("1");
  savedMedium.push("1");
  savedHard.push("1");
  
  savedScore.push("0");
}

getData();

/* ========== modify database ========== */
function getAccountList() {
  userList = JSON.parse(localStorage.getItem("username")) || [];
  passList = JSON.parse(localStorage.getItem("password")) || [];
  emailList = JSON.parse(localStorage.getItem("email")) || [];
  
  coinList = JSON.parse(localStorage.getItem("coins")) || [];
  totalCorrectList = JSON.parse(localStorage.getItem("totalCorrect")) || [];
  levelsMasteredList = JSON.parse(localStorage.getItem("levelsMastered")) || [];
  
  easyList = JSON.parse(localStorage.getItem("easy")) || [];
  mediumList = JSON.parse(localStorage.getItem("medium")) || [];
  hardList = JSON.parse(localStorage.getItem("hard")) || [];
  
  scoreList = JSON.parse(localStorage.getItem("score")) || [];
}

function getData() {
  localStorage.setItem("username", JSON.stringify(savedUsernames));
  localStorage.setItem("password", JSON.stringify(savedPasswords));
  localStorage.setItem("email", JSON.stringify(savedEmails));
  
  storeData();
}

function storeData(){
  localStorage.setItem("coins", JSON.stringify(savedCoins));
  localStorage.setItem("totalCorrect", JSON.stringify(savedTotalCorrect));
  localStorage.setItem("levelsMastered", JSON.stringify(savedLevelsMastered));
  
  localStorage.setItem("easy", JSON.stringify(savedEasy));
  localStorage.setItem("medium", JSON.stringify(savedMedium));
  localStorage.setItem("hard", JSON.stringify(savedHard));
  
  localStorage.setItem("score", JSON.stringify(savedScore));
}

function saveKey(){
  localStorage.setItem("key", accntNum);
}

export function getKey(){
  accntNum = localStorage.getItem("key");
}

function resetAccntNum() {
  accntNum = 0;
  saveKey();
}

/* ========== sign in ========== */
export function verifyAccount(usernameInput, passwordInput){
  resetAccntNum();
  for(let list of savedUsernames){
    if(usernameInput == list){
      verifyPassword(passwordInput);
      return;
    }
    
    accntNum++;
  }
  
  alert("Username does not exist");
}

function verifyPassword(passwordInput){
  if(savedPasswords[accntNum] == passwordInput){
    alert("Login successfully!");
    saveKey();
    window.location.href = "html/sample.html";
    return;
  }
  
  alert("Incorrect password");
  return;
}

/* ========== sign up ========== */
export function signupAccount(usernameInput, emailInput, passwordInput, confirmPassInput){
  if(checkUsernameRule(usernameInput)){
    if(checkEmail(emailInput)){
      checkPassword(usernameInput, emailInput, passwordInput, confirmPassInput);
    };
  }
}

function checkUsernameRule(usernameInput){
  for(let list of savedUsernames){
    if(usernameInput == list){
      alert("Username already exists");
      return false;
    }
  }
  
  if(usernameInput.length < 6){
    alert("Username minimum: 6 characters");
    return false;
  }

  if (usernameInput.length > 12) {
    alert("Username maximum: 12 characters");
    return false;
  }
  
  for(let char of specialChar){
    if(usernameInput.includes(char)){
      alert("Username cannot have special characters");
      return false;
    }
  }
  
  return true;
}

function checkEmail(emailInput){
  if(emailInput.includes("@")){
    return true;
  }
  
  alert("Not a valid email address")
  return false;
}

function checkPassword(usernameInput, emailInput, passwordInput, confirmPassInput){
  if(passwordInput.length < 6){
    alert("Password minimum: 6 characters");
    return;
  }
  
  if(passwordInput.length > 16){
    alert("Password maximum: 16 characters");
    return;
  }
  
  let hasCapital = false;
  for(let list of capitalLetters){
    if(passwordInput.includes(list)){
      hasCapital = true;
      break;
    }
  }
  
  if(!hasCapital){
    alert("Password must atleast contain 1 capital letter");
    return;
  }
  
  let hasSmall = false;
  for (let list of smallLetters) {
    if (passwordInput.includes(list)) {
      hasSmall = true;
      break;
    }
  }
  
  if(!hasSmall){
    alert("Password must atleast contain 1 small letter");
    return;
  }
  
  let hasNum = false;
  for (let list of numbers) {
    if (passwordInput.includes(list)) {
      hasNum = true;
      break;
    }
  }
  
  if(!hasNum){
    alert("Password must atleast contain 1 number");
    return;
  }
  
  for (let list of specialChar) {
    if(passwordInput.includes(list)) {
      alert("Password cannot contain special characters");
      return;
    }
  }
  
  if(passwordInput != confirmPassInput){
    console.log(passwordInput + " " + confirm)
    alert("Password and Confirm password don't match");
    return;
  }
  
  let signup = confirm("Sign up Account?");
  if(signup){
    registerAccount(usernameInput, emailInput, passwordInput);
    
    alert("Successfully registered account!");
    window.location.href = "../index.html";
    return;
  }
}

function registerAccount(user, email, pass){
  savedUsernames.push(user);
  savedEmails.push(email);
  savedPasswords.push(pass);
  
  savedCoins.push("0");
  savedTotalCorrect.push("0");
  savedLevelsMastered.push("0");
  
  savedEasy.push("1");
  savedMedium.push("1");
  savedHard.push("1");
  
  savedScore.push("0");
  
  getData();
  getAccountList();
}


/* ========== special chars and others ========== */
const capitalLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const smallLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const specialChar = [
  "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=",
  "+", "[", "]", "{", "}", "|", ":", ";", "\"", "'", "<", ">",
  ",", ".", "?", "/", "`", "~", "£", "€", "¥", "¢", "°", "√", "π",
  "•", "§", "∆"
];

/* ========== connect to game ========== */
window.fetchData = function() {
  getKey();
}

window.getSavedCoins = function(){
  return savedCoins[accntNum];
}

window.getUsernameValue = function(){
  return savedUsernames[accntNum];
}

window.getTotalCorrectValue = function(){
  return savedTotalCorrect[accntNum];
}

window.getLevelsMastered = function(){
  return savedLevelsMastered[accntNum];
}

window.getEasyDiff = function(){
  return savedEasy[accntNum];
}

window.getMediumDiff = function(){
  return savedMedium[accntNum];
}

window.getHardDiff = function(){
  return savedHard[accntNum];
}

window.getScoreValue = function(){
  return savedScore[accntNum];
}

window.submitData = function(getCoins, getTotalCorrect, getLevelsMastered, getEasy, getMedium, getHard, getScore){
  savedCoins[accntNum] = getCoins;
  savedTotalCorrect[accntNum] = getTotalCorrect;
  savedLevelsMastered[accntNum] = getLevelsMastered;
  
  savedEasy[accntNum] = getEasy;
  savedMedium[accntNum] = getMedium;
  savedHard[accntNum] = getHard;
  
  savedScore[accntNum] = getScore;
  
  storeData();
}

/* ========== get leaderboards ========== */

let first, second, third;

function sortScores(){
  let sorted = savedScore.slice().sort((a, b) => b - a);
  first = sorted[0];
  second = sorted[1];
  third = sorted[2];
}

window.getScores = function(){
  sortScores();
}

window.getFirst = function(){
  let index = 0;
  for(let i of savedScore){
    if(i == first){
      break;
    }
    index++;
  }
  
  return savedUsernames[index];
}

window.getSecond = function(){
  let index = 0;
  for (let i of savedScore){
    if (i == second){
      break;
    }
    index++;
  }
  
  return savedUsernames[index];
}

window.getThird = function(){
  let index = 0;
  for (let i of savedScore){
    if (i == third) {
      break;
    }
    index++;
  }
  
  return savedUsernames[index];
}

window.firstScore = function(){
  return first;
}

window.secondScore = function() {
  return second;
}

window.thirdScore = function() {
  return third;
}