import {FormControl} from '@angular/forms';


export class PasswordValidation {

    static MatchPassword(AC: FormControl) {
       return new Promise( resolve => {
         const password = AC.parent.controls['password'].value; // to get value in input tag
         const repeatPassword = AC.parent.controls['repeatPassword'].value; // to get value in input tag
         if (password === repeatPassword) {
           return resolve(null); // All ok, passwords match!!!
         } else {
            return resolve({'passwordMismatch': true});
         }
      });

    }
}
