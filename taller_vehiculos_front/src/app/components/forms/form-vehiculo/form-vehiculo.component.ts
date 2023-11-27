import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClienteMV } from 'src/app/models/cliente-mv';
import { VehiculoMV } from 'src/app/models/vehiculo-mv';
import { RestService } from 'src/app/services/rest.service';
import {FormsModule} from '@angular/forms';
import Swal from 'sweetalert2';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-form-vehiculo',
  templateUrl: './form-vehiculo.component.html',
  styleUrls: ['./form-vehiculo.component.css']
})
export class FormVehiculoComponent implements OnInit{

  clientes:ClienteMV[];
  
  
  constructor(private fb:FormBuilder, private api:RestService, public formService:FormsService){}

  async ngOnInit() {
    
    await this.api.Get("clientes/").then(
      (res)=>{

        this.clientes = res;
        console.log("Vehiculos_clientes",res);
        
      }
    ).catch(
      (err)=>{
        console.log(err);
        
      }
    )

    if(this.formService.title === "Editar"){

        
       

        
        console.log(this.formService.vehiculo);
        

        this.formVehiculo.setControl('marca', new FormControl(this.formService.vehiculo.marca, Validators.required))
        this.formVehiculo.setControl('modelo', new FormControl(this.formService.vehiculo.modelo, Validators.required))
        this.formVehiculo.setControl('cliente', new FormControl(this.formService.vehiculo.cliente["id"], Validators.required))
        

    }
  }

  formVehiculo = this.fb.group({
    marca: ["", Validators.required],
    modelo : ["", Validators.required],
    cliente : ["", Validators.required]
  })

   async onSubmit(){

    if(this.formVehiculo.valid){

      if(this.formService.title === "Crear"){

        const new_vehiculo:VehiculoMV = {
          modelo: this.formVehiculo.controls["modelo"].value,
          marca: this.formVehiculo.controls["marca"].value,
          cliente:{id:this.formVehiculo.controls["cliente"].value}
        }
  
        console.log(new_vehiculo);
  
        await this.api.Post("vehiculos/", new_vehiculo).then(
  
          (res)=>{
  
            console.log(res);
  
            Swal.fire(
              'Envio satisfactorio!',
              'Guardado',
              'success'
            )
  
            setTimeout(()=>{
              window.location.reload();
            }, 2000)
  
          }
  
        ).catch(
          
            (err)=>{
  
              console.log(err);
  
              Swal.fire(
                'Fallo envio',
                'Rechazado',
                'error'
              )
            }
  
          );
      }

      if(this.formService.title === "Editar"){

        const up_vehiculo:VehiculoMV ={
          id: this.formService.vehiculo.id,
          marca: this.formVehiculo.controls["marca"].value,
          modelo: this.formVehiculo.controls["modelo"].value,
          cliente: {id:this.formVehiculo.controls["cliente"].value}
        }

        console.log("editar",up_vehiculo);

        await this.api.Put("vehiculos/", up_vehiculo).then(
          (res)=>{
            
            console.log(res);

            Swal.fire(
              'Envio satisfactorio!',
              'Actualizado',
              'success'
            )
  
            setTimeout(()=>{
              window.location.reload();
            }, 2000)
            
          }
        ).catch(
          (err)=>{

            console.log(err);

            Swal.fire(
              'Fallo envio',
              'Rechazado',
              'error'
            )
            
          }
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
