import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClienteMV } from 'src/app/models/cliente-mv';
import { FormsService } from 'src/app/services/forms.service';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {

  constructor( private fb:FormBuilder, private api:RestService,public formService:FormsService ){}

  ngOnInit(): void {

    if(this.formService.title === "Editar"){

      this.clienteForm.setControl('nombre', new FormControl(this.formService.cliente.nombre, Validators.required))
      this.clienteForm.setControl('email', new FormControl(this.formService.cliente.email, Validators.required))

    }
    
  }

  clienteForm = this.fb.group({
    nombre:["",Validators.required],
    email:["",Validators.required]
  })

  onSubmit():void{

    if(this.clienteForm.valid){

      if(this.formService.title === "Crear"){

        const new_cliente:ClienteMV ={
          nombre: this.clienteForm.controls['nombre'].value,
          email: this.clienteForm.controls['email'].value
        }
  
        console.log(new_cliente);
  
        this.api.Post("clientes/", new_cliente)
  
        setInterval(()=>{
          window.location.reload();
        }, 2000)
  
        Swal.fire(
          'Envio satisfactorio!',
          'Guardado',
          'success'
        )
      }

      if(this.formService.title === "Editar"){

        const up_cliente:ClienteMV ={
          id: this.formService.cliente.id,
          nombre: this.clienteForm.controls['nombre'].value,
          email: this.clienteForm.controls['email'].value
        }
  
        console.log(up_cliente);
  
        this.api.Put("clientes/", up_cliente)
  
        setInterval(()=>{
          window.location.reload();
        }, 2000)
  
        Swal.fire(
          'Envio satisfactorio!',
          'Editado',
          'success'
        )

      }

    }else{
      Swal.fire(
        'Fallo envio',
        'Rechazado',
        'error'
      )
    }
  }

}
