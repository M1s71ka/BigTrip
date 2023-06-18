import dayjs from 'dayjs';
import { FilterType } from './constants';

const isPointFuture = (point) => dayjs(point.dateFrom).diff(dayjs(new Date)) > 0;

const isPointPast = (point) => dayjs(point.dateTo).diff(new Date()) < 0;

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point)),
};

const changeDateFormat = (dueDate) => dayjs(dueDate).format('DD/MM/YY HH:mm');
const changeDateFormatToMonth = (dueDate) => dayjs(dueDate).format('MMM D');
const changeDateFormatToHours = (dueDate) => dayjs(dueDate).format('HH:mm');
const getMinutesFromDate = (dueDate) => dayjs(dueDate).format('m');
const getHoursFromDate = (dueDate) => dayjs(dueDate).format('h');

const getDatesDifferenceByTimeType = (dateTo, dateFrom, time) => {
  const departureDay = dayjs(dateFrom);
  const arrivingDay = dayjs(dateTo);
  switch (time) {
    case 'd':
      return Math.floor(arrivingDay.diff(departureDay) / 86400000);
    case 'h':
      return Math.floor((arrivingDay.diff(departureDay) % 86400000) / 3600000);
    case 'm':
      return Math.floor(((arrivingDay.diff(departureDay) % 86400000) % 3600000) / 60000);
  }
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortPointByDateUp = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  return (weight) ? weight : dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortPointsByTime = (pointA, pointB) =>
  dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));

export {filter, changeDateFormat, changeDateFormatToMonth, changeDateFormatToHours, getMinutesFromDate, getHoursFromDate,
  getDatesDifferenceByTimeType, sortPointByDateUp, sortPointsByPrice, sortPointsByTime};
