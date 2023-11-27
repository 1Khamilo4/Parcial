import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormMecanicoComponent } from 'src/app/components/forms/form-mecanico/form-mecanico.component';
import { MecanicoMV } from 'src/app/models/mecanico-mv';
import { FormsService } from 'src/app/services/forms.service';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mecanico',
  templateUrl: './mecanico.component.html',
  styleUrls: ['./mecanico.component.css']
})
export class MecanicoComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = [];
  dataSource : MatTableDataSource<any>;
  mecanico_or : MecanicoMV[];
  cargando:Boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public api: RestService, public dialog: MatDialog, public formsService:FormsService){
    this.cargando = true;
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.get_obtenerMecanicos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'registro por pagina';
  }

  public get_obtenerMecanicos(){

    this.api.Get("mecanicos/").then((res)=>{
      
      if(res.length != 0){

        this.loadTable(res[0]);
        console.log("kk original",res);

        
        let new_data = JSON.parse(JSON.stringify(res))
        this.mecanico_or = res;
        new_data.map((i, index)=>{
          new_data[index].vehiculo = i.vehiculo.marca +"-"+ i.vehiculo.modelo;
        })

        console.log("kk nueva", new_data);
        
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

  btnEditar(mecanico:MecanicoMV){

    
    this.formsService.title = "Editar";   

    this.mecanico_or.map((m_o)=>{
        (m_o.id === mecanico.id)? mecanico = m_o : null
    })

    this.formsService.mecanico = mecanico;

    this.dialog.open(FormMecanicoComponent);

    console.log("mecanico_org", this.mecanico_or);

    console.log("mecanico_id", mecanico);
    
    
    return false;
  }
  btnEliminar(mecanico:MecanicoMV){

    Swal.fire({
      title: 'Esta seguro de eliminar al Mecanico?',
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
            `El mecanico con el id ${mecanico.id} ha sido eliminado.`,
            'success'
          )
          
          setInterval(()=>{
          window.location.reload();
          }, 2000)

          this.api.Delete("mecanicos/", mecanico)
        /* console.log(cliente.id); */
        
      }
    })


    return false;
    
  }

  openDialog(){
    this.formsService.title = "Crear";
    this.dialog.open(FormMecanicoComponent)
  }


}
