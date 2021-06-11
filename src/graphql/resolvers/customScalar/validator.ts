// Check whether a certain year is a leap year.
//
// Every year that is exactly divisible by four
// is a leap year, except for years that are exactly
// divisible by 100, but these centurial years are
// leap years if they are exactly divisible by 400.
// For example, the years 1700, 1800, and 1900 are not leap years,
// but the years 1600 and 2000 are.
//
export const leapYear = (year: number): boolean => {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const validateJSDate = (date: Date): boolean => {
	const time = date.getTime();
	return time === time; // eslint-disable-line
};

export const validateDate = (datestring: string): boolean => {
	const RFC_3339_REGEX = /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]))$/;

	if (!RFC_3339_REGEX.test(datestring)) {
		return false;
	}

	// Verify the correct number of days for
	// the month contained in the date-string.
	const year = Number(datestring.substr(0, 4));
	const month = Number(datestring.substr(5, 2));
	const day = Number(datestring.substr(8, 2));

	switch (month) {
		case 2: // February
			if (leapYear(year) && day > 29) {
				return false;
			} else if (!leapYear(year) && day > 28) {
				return false;
			}
			return true;
		case 4: // April
		case 6: // June
		case 9: // September
		case 11: // November
			if (day > 30) {
				return false;
			}
			break;
	}

	return true;
};
