import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormVehiculoComponent } from 'src/app/components/forms/form-vehiculo/form-vehiculo.component';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = [];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( public api: RestService, public dialog: MatDialog ){
    this.dataSource = new MatTableDataSource();
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

        let new_data = Object.assign([], res);

        res.map((i, index)=>{
          new_data[index].cliente = i.cliente.nombre;
        })

        this.dataSource.data = new_data;
        console.log(this.dataSource.data);

      }else{
        throw new Error("No hay datos");
      }      
      
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

  btnEditar(){
    alert("Btn de editar");
    return false;
  }
  btnEliminar(){
    alert("Btn de Eliminar");
    return false;
  }

  openDialog(){
    this.dialog.open(FormVehiculoComponent)
  }
}
