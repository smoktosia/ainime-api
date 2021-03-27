function isEmail(mail: string)
{
    return (/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail))
}

function isAlphanumeric(string: string) {
    var re = /^[a-z0-9_]+$/i;
    return re.test(String(string).toLowerCase());
}

export { isEmail, isAlphanumeric }