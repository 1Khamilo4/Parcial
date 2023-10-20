import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { MecanicoComponent } from './pages/mecanico/mecanico.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { FormClientesComponent } from './components/forms/form-clientes/form-clientes.component';
import { FormMecanicoComponent } from './components/forms/form-mecanico/form-mecanico.component';
import { FormVehiculoComponent } from './components/forms/form-vehiculo/form-vehiculo.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MenuComponent } from './components/menu/menu.component';
import { InconUserComponent } from './components/incon-user/incon-user.component';
import {MatCardModule} from '@angular/material/card';

/* Avatar */
import { AvatarModule } from 'ngx-avatars';

//Tablas : Modificamos el archivo 'app.module.ts' donde debemos importar MatTableModule, MatPaginatorModule, BrowserAnimationsModule:
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';

//Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Dialog */
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    VehiculoComponent,
    MecanicoComponent,
    ClienteComponent,
    InconUserComponent,
    FormClientesComponent,
    FormMecanicoComponent,
    FormVehiculoComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AvatarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
