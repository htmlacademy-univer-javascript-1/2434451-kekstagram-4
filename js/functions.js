function clockTimeToInt(time){ //Переводит время из формата hh:mm в количество минут, прошедших с 00:00
  time = time.split(':');
  const hours = parseInt(time[0], 10);
  const minutes = parseInt(time[1], 10);
  return hours*60+minutes;
}

function isPossibleMeeting(timeStart, timeEnd, startMeeting, duration){
  timeStart = clockTimeToInt(timeStart);
  timeEnd = clockTimeToInt(timeEnd);
  startMeeting = clockTimeToInt(startMeeting);
  //Если начало встречи раньше начала рабочего дня или начало встречи+длина встречи выходит за пределы рабочего дня - False
  return !(startMeeting < timeStart || startMeeting + duration > timeEnd);
}

isPossibleMeeting('8:00', '17:30', '08:00', 900);
