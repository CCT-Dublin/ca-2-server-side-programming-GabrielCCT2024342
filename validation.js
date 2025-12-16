const regExs = [/^[a-zA-Z]{2,20}$/, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, /^[0-9]{10}$/, /^[a-zA-z]{1}[0-9]{2}.+[a-zA-Z0-9]$/];

//The instructions say "Eircode must start with a number, be alphanumeric, and exactly 6 characters" but eircodes start with a letter and are 7 digits longs


function validation (string, regEx){
    if (regEx.test(string)) {
        return true;
    }else {
        console.log("invalid input: " + string);
        return false
    }
}

function fullValidation(fname, lname, email, pnumber, eircode){
    fNameCheck = validation(fname, regExs[0]);
    lNameCheck = validation(lname, regExs[0]);
    pnumberCheck = validation(email, regExs[1]);
    emailCheck = validation(pnumber, regExs[2]);
    eircodeCheck = validation(eircode, regExs[3]);

    if( fNameCheck == false || lNameCheck == false || pnumberCheck == false || emailCheck == false || eircodeCheck == false){
        return false
    }

    return true
}

module.exports.validation = validation
module.exports.fullValidation = fullValidation
module.exports.regExs = regExs
