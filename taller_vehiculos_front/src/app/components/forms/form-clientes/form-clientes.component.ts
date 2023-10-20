import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent {

  constructor( private fb:FormBuilder ){}

  clienteForm = this.fb.group({
    nombre:["",Validators.required],
    email:["",Validators.required]
  })

  onSubmit():void{

    if(this.clienteForm.valid){
      Swal.fire(
        'Envio satisfactorio!',
        'Guardado',
        'success'
      )

    }else{
      Swal.fire(
        'Fallo envio',
        'Rechazado',
        'error'
      )
    }
  }

}
