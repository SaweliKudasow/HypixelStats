function lettersNumbers(event) {
    var charCode = event.which || event.keyCode;
    var charStr = String.fromCharCode(charCode);
    var pattern = /^[a-zA-Z0-9_]*$/;

    if (!pattern.test(charStr)) {
        return false;
    }
}
