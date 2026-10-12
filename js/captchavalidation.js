function validate() {
    var valid = true;
    Array.from(document.querySelectorAll("[required]")).every(elem => {
        if(!elem.reportValidity()) {
            valid = false;
            return false;
        } else {
            return true;
        }
    });

    return valid;
}