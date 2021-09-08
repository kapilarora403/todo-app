export const getTimeStringFromDate = (date) => {
    let hours = date.getHours();
    if (hours === 0) {
        hours = 12;
    }
    if (hours > 12) {
        hours -= 12;
    }
    let minutes = date.getMinutes();
    if (hours.toString().length < 2) {
        hours = `0${hours}`
    }
    if (minutes.toString().length < 2) {
        minutes = `0${minutes}`
    }
    return `${hours}:${minutes} ${date.getHours() > 12 ? 'PM' : 'AM'}`
}

export const MONTHS_MAP = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
}

export const filters = {
    all: 'all',
    completed: 'completed',
    pending: 'pending',
}
