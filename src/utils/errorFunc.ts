import IErrors from "../types/Errors"

const errors: Array<IErrors> = [
    {
        code: 'auth',
        value: "Пожалуйста авторизуйтесь в системе",
    },
    {
        code: "Method argument not valid",
        value: "Ошибка авторизации",
    }   
] 

export function errorFunc(code: string): string {
    let msg = ''
    errors.forEach(error => {
        console.log(error)
        msg = error.code == code ? error.value : "Неизвестная ошибка"
    })
    
    return msg;
}