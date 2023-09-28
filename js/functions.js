function CheckStringLength(string, length){
  if (string.length <= length){
    return true;
  }
  return false;
}

function IsPalindrom(string){
  if (string === string.split('').reverse().join('')){
    return true;
  }
  return false;
}

function IsPalindromWithSpaces(string){
  if (string.replaceAll(' ', '').split('').reverse().join('').toLowerCase()
   === string.replaceAll(' ', '').toLowerCase()){
    return true;
  }
  return false;
}

function ExtractNumbers(string){
  let answer = '';
  string = string.toString();
  const numbers = '0123456789';
  for(let i = 0; i < string.length; i++){
    if (numbers.indexOf(string[i]) > -1){
      answer += string[i];
    }
  }
  if(answer === ''){
    return NaN;
  }
  return +answer;
}

CheckStringLength('Привет!!!', 8); //true
CheckStringLength('Привет!!!', 3); //true
CheckStringLength('Привет!!!', 20000); //false

IsPalindrom('Привет'); //false
IsPalindrom('ogo'); //true
IsPalindrom('aha-ha'); //false

IsPalindromWithSpaces('Лёша на полке клопа нашёл '); //true
IsPalindromWithSpaces('Лёша наа полке клопа нашёл '); //false

ExtractNumbers('fds12321'); // 12321
ExtractNumbers('gkasd'); // NaN
ExtractNumbers('1'); // 1
ExtractNumbers(1231); // 1231

