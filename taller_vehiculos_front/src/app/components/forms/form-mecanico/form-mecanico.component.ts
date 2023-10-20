import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-mecanico',
  templateUrl: './form-mecanico.component.html',
  styleUrls: ['./form-mecanico.component.css']
})
export class FormMecanicoComponent {

  constructor( private fb:FormBuilder){

  }

  mecanicoForm = this.fb.group({
    nombre: ["",Validators.required],
    especialidad: ["", Validators.required]
  })

  onSubmit():void{

   if(this.mecanicoForm.valid){
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
