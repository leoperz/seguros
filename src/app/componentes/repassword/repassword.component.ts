import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

export function CompararData(
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
  selector: 'app-repassword',
  templateUrl: './repassword.component.html',
  styleUrls: ['./repassword.component.css']
})
export class RepasswordComponent implements OnInit {

  uid:string="";
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private _usuario: UsuarioService, private _router: Router) { }

  ngOnInit() {
    this._usuario.repass$.subscribe(resp=>{this.uid=resp});
    document.getElementById('btnRepassword').click();

    this.registerForm = this.formBuilder.group({
      
      pass:['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword:['',Validators.required]
      
  },
  
    {
      validator:[CompararData("password", "repassword")] 
      
    },
  );
  }


  get f() { return this.registerForm.controls; }

  onSubmit() {
   
   this.submitted=true;
    
    
    if (this.registerForm.invalid) {

     return;
      
    }else{
      
    }
  
    this.registerForm.reset();
    
}

}
