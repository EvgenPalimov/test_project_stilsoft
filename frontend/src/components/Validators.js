const validateForm = ({formErrors, ...rest}) => {
    let valid = true;

    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(value => {
        value === '' && (valid = false);
    });

    return valid;
}

function validateUniqueEmail(listObjects, email) {
    let valid = false;

    Object.values(listObjects).forEach(object => {
        object.email === email && (valid = true);
    });

    return valid;
}

function validateUsers(formErrors, listObjects, name, value, star_args) {
    const emailRegex = RegExp(/^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/);

    switch (name) {
        case 'username':
            formErrors.username = value.length > 0
                ? ''
                : 'The field cannot be empty';
            return formErrors;
        case 'firstName':
            formErrors.firstName = value.length > 0
                ? ''
                : 'The field cannot be empty';
            return formErrors;
        case 'lastName':
            formErrors.lastName = value.length > 0
                ? ''
                : 'The field cannot be empty';
            return formErrors;
        case 'email':
            if (!emailRegex.test(value)) {
                formErrors.email = 'The email was entered incorrectly';
                return formErrors;
            } else if (validateUniqueEmail(listObjects, value)) {
                formErrors.email = 'This email has already been registered';
                return formErrors;
            } else {
                formErrors.email = '';
                return formErrors;
            }
        case 'password':
            formErrors.password = value.length > 0
                ? ''
                : 'The field cannot be empty';
            return formErrors;
        case 'password2':
            if (value.length <= 0) {
                formErrors.password2 = 'The field cannot be empty';
                return formErrors;
            } else if (value !== star_args[0]) {
                formErrors.password2 = 'Passwords don\'t match';
                return formErrors;
            } else {
                formErrors.password2 = '';
                return formErrors;
            }
        default:
            return formErrors;
    }
}

function validateTransactions(formErrors, listObjects, name, value) {

    switch (name) {
        case 'amount':
            if (value <= 0) {
                formErrors.amount = 'The field cannot be empty';
                return formErrors;
            } else if (!/^[0-9]+$/.test(parseInt(Number(value)))){
                formErrors.amount = 'The amount should only be a number';
                return formErrors;
            } else {
                formErrors.amount = '';
                return formErrors;
            }
        case 'reason':
            formErrors.reason = value === 'rec' || value === 'wri'
                ? ''
                : 'The field cannot be empty';
            return formErrors;
        default:
            return formErrors;
    }
}


export {validateForm, validateUsers, validateTransactions};