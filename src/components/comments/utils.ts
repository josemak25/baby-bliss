export const simpleDateFormatter = (date: Date) => {
  if (!date) return undefined;

  const timestamp = new Date(date);

  if (isNaN(timestamp.getTime())) {
    throw new Error("Invalid timestamp passed to 'since()'");
  }

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 12 * month;

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const DATE_CONSTANTS = {
    January: 31,
    February: 29,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getUTCMonth();

  const timeDifference = currentDate.getTime() - timestamp.getTime();

  const timestampDay = timestamp.getUTCDate();
  const timestampMonth = timestamp.getUTCMonth() + 1;
  const timestampYear = timestamp.getFullYear();
  const timestampAbrvMonth = timestamp.toDateString().split(' ')[1];

  const monthEnd = DATE_CONSTANTS[MONTHS[timestampMonth]];

  const timestampMonthEnd = Math.floor(timeDifference / day);

  switch (true) {
    case Math.floor(timeDifference / year) > 1:
      return `${timestampAbrvMonth} ${timestampDay} ${
        currentYear == timestampYear ? '' : timestampYear
      }`;

    case Math.floor(timeDifference / month) > 1:
      return `${timestampAbrvMonth} ${timestampDay} ${
        currentYear == timestampYear ? '' : timestampYear
      }`;

    case Math.floor(timeDifference / day) > 1:
      if (currentMonth === timestampMonth && timestampMonthEnd === monthEnd) {
        return `${timestampAbrvMonth} ${timestampDay} ${
          currentYear == timestampYear ? '' : timestampYear
        }`;
      }

      if (currentMonth === timestampMonth && timestampMonthEnd >= monthEnd) {
        return `${timestampAbrvMonth} ${timestampDay} ${
          currentYear == timestampYear ? '' : timestampYear
        }`;
      }

      return `${Math.floor(timeDifference / day)}d`;

    case Math.floor(timeDifference / hour) > 1:
      if (Math.floor(timeDifference / hour) > 24) {
        return `${Math.floor(timeDifference / hour / 24)}d`;
      }

      return `${Math.floor(timeDifference / hour)}h`;

    case Math.floor(timeDifference / minute) > 1:
      if (Math.floor(timeDifference / minute) > 60) {
        return `${Math.floor(timeDifference / minute / 60)}h`;
      }

      return `${Math.floor(timeDifference / minute)}m`;

    default:
      return `just now`;
  }
};
