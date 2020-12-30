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

  perfil:string="";
  flag=0;
  sucursal:string="";
  registerForm: FormGroup;
  submitted = false;
  espiar = false;
  respiar=false;
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
    document.getElementById('botonRegistrar').click();
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


    if(this.sucursal=='Estudio de abogados')this.perfil = "abogado";
    else this.perfil = "operador";
    
    let payload = {
      nombre:this.registerForm.controls.nombre.value,
      apellido:this.registerForm.controls.apellido.value,
      sucursal:this.sucursal,
      mail:this.registerForm.controls.email.value,
      password:this.registerForm.controls.password.value,
      perfil:this.perfil,
      imagen:""
    }

    this._usuario.registrarUsuario(payload);

    this.registerForm.reset();
    document.getElementById('btnCerrar').click();
    document.getElementById('botonMensaje').click();

}

redireccionar(){
  
    this._router.navigateByUrl('/inicio');
}


mostrarPassword(){
  this.espiar=true;
  (document.getElementById('contra') as HTMLInputElement).type = "text";
}


ocultarPassword(){
  this.espiar = false;
  (document.getElementById('contra') as HTMLInputElement).type = "password";
}

remostrarPassword(){
  this.respiar=true;
  (document.getElementById('recontra') as HTMLInputElement).type = "text";
}


reocultarPassword(){
  this.respiar = false;
  (document.getElementById('recontra') as HTMLInputElement).type = "password";
}


}
