import dayjs from 'dayjs';

export function date(date, format = 'MMMM D, YYYY') {
    return dayjs(date).format(format);
}
