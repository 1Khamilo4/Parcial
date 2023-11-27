import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormClientesComponent } from 'src/app/components/forms/form-clientes/form-clientes.component';
import { ClienteMV } from 'src/app/models/cliente-mv';
import { FormsService } from 'src/app/services/forms.service';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = [];
  dataSource : MatTableDataSource<any>;
  cargando:Boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( public api: RestService, public dialog: MatDialog, public formService:FormsService ){
    this.cargando=true;
    this.dataSource = new MatTableDataSource();
  }


  ngOnInit(): void {
    this.get_obtenerClientes();
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public get_obtenerClientes(){

    this.api.Get("clientes/").then((res)=>{
      
      if(res.length != 0){

        this.loadTable(res[0]);

        /* let new_data = Object.assign([], res);

        res.map((i, index)=>{
          new_data[index].usuario = i.usuario.username;
        }) */

        this.dataSource.data = res;
        console.log(this.dataSource.data);

      }else{
        throw new Error("No hay datos");
      }      
      this.cargando=false;
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

  btnEditar(cliente:ClienteMV){

    this.formService.title = "Editar";
    this.formService.cliente = cliente;
    
    this.dialog.open(FormClientesComponent, {
      width: '40%'
    });

    console.log(cliente.id);
    
    return false;
    
  }
  btnEliminar(cliente:ClienteMV){
    
    Swal.fire({
      title: 'Esta seguro de eliminar al Usuario?',
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
            `El usuario con el id ${cliente.id} ha sido eliminado.`,
            'success'
          )
          
          setInterval(()=>{
          window.location.reload();
          }, 2000)

        this.api.Delete("clientes/", cliente);
        /* console.log(cliente.id); */
        
      }
    })

    return false;
  }

  openDialog(){
    this.formService.title = "Crear";
    this.dialog.open(FormClientesComponent)
  }
  
}
