export const regExAlphaNumeric: RegExp = /^[A-Za-z0-9]+$/;
export const regExAlphaNumericAndSpaces: RegExp = /^[a-zA-Z0-9ñÑ ]*$/;
export const regExAlphaNumericComplete: RegExp = /^[a-zA-ZÁ-ú0-9,.' ]*$/;
export const regExOnlyNumbers: RegExp = /^\d+$/;
export const regExEmail: string = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' + '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
export const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const regExExpirationDate = /^(0[1-9]|1[0-2])\/\d{2}$/;