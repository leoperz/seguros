import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export function CompareData(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}




@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword:['',Validators.required],
      reemail:['',Validators.required],
      
  },
  
    {
      validator:[CompareData("password", "repassword"), CompareData("email","reemail")] 
      
    },
  );
  }


  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    
    if (this.registerForm.invalid) {
        return;
    }

    console.log(this.registerForm.controls.nombre.value);
    
    let payload = {
      nombre:this.registerForm.controls.nombre.value,
      apellido:this.registerForm.controls.apellido.value,
      mail:this.registerForm.controls.email.value,
      password:this.registerForm.controls.password.value
    }


}


}
