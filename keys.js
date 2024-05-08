function lettersNumbers(event) {
    var charCode = event.which || event.keyCode;
    var charStr = String.fromCharCode(charCode);
    var pattern = /^[a-zA-Z0-9_]*$/; // буквы, цифры и символ '_'

    if (!pattern.test(charStr)) {
        return false; // отклоняем ввод если если он содержит что-то другое
    }
}
