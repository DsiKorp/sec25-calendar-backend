import moment from 'moment';

export const isDate = (value: any): boolean => {

    if (!value) {
        return false;
    }

    const fecha = moment(value);

    if (fecha.isValid()) {
        return true;
    }

    return false;

    // return !isNaN(Date.parse(value));
};