import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import {Router} from '@angular/router';

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

  flag=0;
  sucursal:string="";
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private _usuario: UsuarioService, private _router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword:['',Validators.required],
      reemail:['',Validators.required]
      
  },
  
    {
      validator:[CompareData("password", "repassword"), CompareData("email","reemail")] 
      
    },
  );
  }


  get f() { return this.registerForm.controls; }



  cambiarEstado(sucursal:any){
    this.sucursal=sucursal;
    this.flag=0;
  }


  onSubmit() {
    this.submitted = true;
    
    
    if (this.registerForm.invalid) {

      if(this.sucursal==""){
        this.flag = 1;
      }
      console.log(this.sucursal, this.flag);
        return;
    }

    if(this.sucursal==""){
      this.flag = 1;
      return;
    }


    
    
    let payload = {
      nombre:this.registerForm.controls.nombre.value,
      apellido:this.registerForm.controls.apellido.value,
      sucursal:this.sucursal,
      mail:this.registerForm.controls.email.value,
      password:this.registerForm.controls.password.value
    }

    this._usuario.registrarUsuario(payload).then(
      resp=>{
        this.registerForm.reset();
        document.getElementById('botonMensaje').click();
        setTimeout(() => {
          this._router.navigateByUrl('/inicio');
        }, 2000);
        
      }
    ).catch(resp=>{
      console.log(resp);
    });


}


}
