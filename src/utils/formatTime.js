import {
  format,
  getTime,
  formatDistanceStrict,
  isAfter,
  add,
  differenceInHours
} from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'yyyy-MM-dd'); //dd MMMM yyyy
}

export function fDateTime(date, dateFormat) {
  return format(new Date(date), dateFormat ?? 'dd MMM yyyy p');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date, options = { addSuffix: true }) {
  return formatDistanceStrict(new Date(date), server.currentTime, options);
}

export function fIsAfter(date, min = 0) {
  return isAfter(server.currentTime, add(new Date(date), { minutes: min }));
}

export function fDiffInHours(date) {
  return differenceInHours(server.currentTime, new Date(date));
}

export const server = {
  date: new Date(),
  get year() {
    return this.date.getUTCFullYear();
  },
  get month() {
    return this.date.getUTCMonth();
  },
  get day() {
    return this.date.getUTCDate();
  },
  get hour() {
    return this.date.getUTCHours();
  },
  get minutes() {
    return this.date.getUTCMinutes();
  },
  get seconds() {
    return this.date.getUTCSeconds();
  },
  get currentTime() {
    return new Date(
      `${this.year}-${this.month + 1}-${this.day} ${this.hour}:${
        this.minutes
      }:${this.seconds}`
    );
  }
};
