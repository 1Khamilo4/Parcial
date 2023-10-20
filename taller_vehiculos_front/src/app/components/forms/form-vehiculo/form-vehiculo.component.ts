import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-vehiculo',
  templateUrl: './form-vehiculo.component.html',
  styleUrls: ['./form-vehiculo.component.css']
})
export class FormVehiculoComponent {

  constructor(private fb:FormBuilder){}

  formVehiculo = this.fb.group({
    marca: ["", Validators.required],
    modelo : ["", Validators.required]
  })

  onSubmit():void{
    if(this.formVehiculo.valid){
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
