import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MecanicoMV } from 'src/app/models/mecanico-mv';
import { VehiculoMV } from 'src/app/models/vehiculo-mv';
import { FormsService } from 'src/app/services/forms.service';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-mecanico',
  templateUrl: './form-mecanico.component.html',
  styleUrls: ['./form-mecanico.component.css']
})
export class FormMecanicoComponent implements OnInit{

  vehiculos:VehiculoMV[];

  constructor( private fb:FormBuilder, private api:RestService, public formsService:FormsService){}

  async ngOnInit() {

    

    await this.api.Get("vehiculos/").then(
      (res)=>{
        this.vehiculos = res;
        console.log("Mecanicos_clientes", this.vehiculos);
        
      }
    ).catch(
      (err)=>{
        console.log(err);
        
      }
    )

    if(this.formsService.title === "Editar"){

      this.mecanicoForm.setControl('nombre', new FormControl(this.formsService.mecanico.nombre, Validators.required))
      this.mecanicoForm.setControl('especialidad', new FormControl(this.formsService.mecanico.especialidad, Validators.required))
      this.mecanicoForm.setControl('vehiculo', new FormControl(this.formsService.mecanico.vehiculo["id"], Validators.required))
      
      console.log(this.formsService.mecanico.vehiculo["id"]);

    }

    

  }

  mecanicoForm = this.fb.group({
    nombre: ["",Validators.required],
    especialidad: ["", Validators.required],
    vehiculo: ["", Validators.required]
  })

  async onSubmit(){    

   if(this.mecanicoForm.valid){

    if(this.formsService.title === "Crear"){

      const new_mecanico:MecanicoMV = {
        nombre: this.mecanicoForm.controls["nombre"].value,
        especialidad: this.mecanicoForm.controls["especialidad"].value,
        vehiculo: {id:this.mecanicoForm.controls["vehiculo"].value}
      }
  
      console.log(new_mecanico);   
      
      await this.api.Post("mecanicos/", new_mecanico).then(
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
      )

    }

    if(this.formsService.title === "Editar"){
      
      const up_mecanico:MecanicoMV = {
        id: this.formsService.mecanico.id,
        nombre: this.mecanicoForm.controls["nombre"].value,
        especialidad: this.mecanicoForm.controls["especialidad"].value,
        vehiculo: {id:this.mecanicoForm.controls["vehiculo"].value}
      }
      
      console.log(up_mecanico);

      await this.api.Put("mecanicos/", up_mecanico).then(
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
