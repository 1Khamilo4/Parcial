import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormVehiculoComponent } from 'src/app/components/forms/form-vehiculo/form-vehiculo.component';
import { VehiculoMV } from 'src/app/models/vehiculo-mv';
import { FormsService } from 'src/app/services/forms.service';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = [];
  dataSource : MatTableDataSource<any>;
  vehiculo_or : VehiculoMV[];
  cargando : Boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( public api: RestService, public dialog: MatDialog, public formsService:FormsService ){
    this.dataSource = new MatTableDataSource();
    this.cargando = true;
  }

  ngOnInit(): void {
    this.get_obtenerVehiculos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'registro por pagina';
  }

  public get_obtenerVehiculos(){

    this.api.Get("vehiculos/").then((res)=>{
      
      if(res.length != 0){

        this.loadTable(res[0]);

        /* let new_data = Object.assign([], res); */
        let new_data = JSON.parse(JSON.stringify(res))
        this.vehiculo_or = res;
        new_data.map((i, index)=>{
          new_data[index].cliente = i.cliente.nombre;
        })

        this.dataSource.data = new_data;
        console.log(this.dataSource.data);

      }else{
        throw new Error("No hay datos");
      }      
      this.cargando = false;
    })

  }

  loadTable(data:any){

    this.displayedColumns = [];

    for(let columns in data){

      this.displayedColumns.push(columns);

    }  

    this.displayedColumns.push("acciones")
    console.log(this.displayedColumns);
    
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  btnEditar(vehiculo:VehiculoMV){
    this.formsService.title = "Editar";

    this.vehiculo_or.map((v_o)=>{
      (v_o.id === vehiculo.id)? vehiculo = v_o : null
    })


    this.formsService.vehiculo = vehiculo;
    this.dialog.open(FormVehiculoComponent)
    return false;
  }
  btnEliminar(vehiculo:VehiculoMV){
    

    Swal.fire({
      title: 'Esta seguro de eliminar al Vehiculo?',
      text: "No podra revertir esta operacion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      
      if (result.isConfirmed) {

          Swal.fire(
            'Eliminado!',
            `El vehiculo con el id ${vehiculo.id} ha sido eliminado.`,
            'success'
          )
          
          setInterval(()=>{
          window.location.reload();
          }, 2000)

          this.api.Delete("vehiculos/", vehiculo)
        /* console.log(cliente.id); */
        
      }
    })


    return false;
  }

  openDialog(){
    this.dialog.open(FormVehiculoComponent)
  }
}
