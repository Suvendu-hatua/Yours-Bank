import { AbstractControl, ValidationErrors } from "@angular/forms";

 export class VWITS_Validation{

    static nameValidation(controlobj:AbstractControl):ValidationErrors | null{

        const nameRegex: RegExp=/^[a-zA-Z\s]+$/;
        if(nameRegex.test(controlobj.value)===false){
            return {"nameValidation":true}
        }
        return null;
    }

    static passwordValidation(controlobj:AbstractControl):ValidationErrors | null{
        
        const passwordRegex:RegExp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        if(passwordRegex.test(controlobj.value)===false){
            return {"passwordValidation":true}
        }
        return null;
    }

    static amountValidation(controlobj:AbstractControl):ValidationErrors | null{
        
        const amountRegex:RegExp=/^[+-]?([0-9]*[.])?[0-9]+$/;

        if(amountRegex.test(controlobj.value)===false){
            return {"amountValidation":true}
        }
        return null;
    }

}