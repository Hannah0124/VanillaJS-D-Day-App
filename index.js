const NINE_HOURS_MILLISECONDS = 32400000;
const ddayClock = document.querySelector('.dday-clock'),
	currClock = document.querySelector('.current-clock'),
	today = document.querySelector('.today'),
	form = document.querySelector('form'),
	calendar = document.querySelector('.calendar'),
	title = document.querySelector('.title'),
	input = document.querySelector('input'),
	ddayMessage = document.querySelector('.dday-message'),
	timeUntil = document.querySelector('timeUntil');

const D_DAY = 'dDay';

const CURRENT_YEAR = new Date().getFullYear();

function saveDate(date) {
	localStorage.setItem(D_DAY, date);
	// loadData();
}

function handleSelect(event) {
	event.preventDefault();
	const inputDate = calendar.value;

	getTime();
	// saveDate(inputDate) // TEST
	console.log('inputDate?? ' + inputDate);;
}

function addZero(num) {
	if (num < 10) {
		return `0${num}`;
	} else {
		return num;
	}
}

function getTime() {
	form.addEventListener('select', handleSelect);


	const inputDate = calendar.value;
	// TEST
	// const inputDate = localStorage.getItem(D_DAY)

	console.log('yay', inputDate)
	
	const dDay = new Date(`${inputDate}:00:00:00+0900`);
	const dateNow = new Date();

	const difference = new Date(dDay - dateNow - NINE_HOURS_MILLISECONDS);

	let months = difference.getMonth();
	let days = difference.getDate();
	let hours = difference.getHours();
	let minutes = difference.getMinutes();
	let seconds = difference.getSeconds();

	// If it's d-day
	if (dDay.getFullYear() === dateNow.getFullYear() && dDay.getDate() === dateNow.getDate() && dDay.getMonth() === dateNow.getMonth()) {
		if (dateNow.getMonth() + 1 === 12 && dateNow.getDate() === 24) {
			ddayClock.innerHTML = `<span>Happy Christmas eve!!🎄</span>`;
		} else if (dateNow.getMonth() + 1 === 12 && dateNow.getDate() === 25) {
			ddayClock.innerHTML = `<span>Merry Christmas!!🎄</span>`;
		} else {
			ddayClock.innerHTML = `<span>Today is D-Day!!!😃</span>`;
		}
	} else {
		if (Number.isNaN(months)) {
			ddayClock.innerText = 'Select your date!'
		} else {
			ddayClock.innerText = 
			months > 0 
				? `${months} months ${days} days ${addZero(hours)}:${addZero(minutes)}:${addZero(
						seconds
					)}`
				: `${addZero(days)} days ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
		}
	}


	inputArr = inputDate.split('-');
	console.log(inputDate.length);
	if (inputDate.length === 0) {
		title.innerText = '...';
	} else if (inputArr[1] === '12') {
		if (inputArr[2] === '24') {
			title.innerText = ' Chirstmas Eve!';
		} else if (inputArr[2] === '25') {
			title.innerText = ' Chirstmas!';
		} else if (inputArr[2] === '31') {
			title.innerText = ' End of Year!';
		}
	} else {
		// console.log(inputDate);
		title.innerText = ` ${inputArr[1]}/${inputArr[2]}/${inputArr[0]}`;
	}
	// console.log(calendar.value);

	saveDate(`${inputDate}:00:00:00+0900`);
}

function getCurrentTime() {
	var currDay = new Date();

	const currYear = currDay.getFullYear();
	const currMonth = currDay.getMonth() + 1;
	const currDate = currDay.getDate();
	let currHours = currDay.getHours();
	let currMinutes = currDay.getMinutes();
	let currSeconds = currDay.getSeconds();

	currClock.innerText = `${addZero(currHours)}:${addZero(currMinutes)}:${addZero(currSeconds)}`;

	today.innerText = `${addZero(currMonth)}-${addZero(currDate)}-${currYear}`;

	input.min = `${currYear}-${currMonth}-${currDate}`;
	input.max = `${currYear + 1}-${currMonth}-${currDate - 1}`;
}

function loadData() {
	const dDayfromLS = localStorage.getItem(D_DAY);
	console.log('from ls' + dDayfromLS)


  // If there is data from LS
	if (dDayfromLS !== null) {
		getTime();
		setInterval(getTime, 1000);
	} else {
		localStorage.setItem(D_DAY, '2019-12-24:00:00:00+0900');
	}
}

function init() {
  loadData();
	form.addEventListener('select', handleSelect);
	
	getCurrentTime();
	setInterval(getCurrentTime, 1000);
}

init();
