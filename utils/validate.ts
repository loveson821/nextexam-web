export const validate_email = (value: string) => {
    if( value == null || value == '' || value == undefined) return false;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(value)
}

export const validatePhoneNumber = (phone: string) => {
    // console.log(phone)
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    return regexp.test(phone)
  }