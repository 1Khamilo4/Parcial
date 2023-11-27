import { Injectable } from '@angular/core';
import { ClienteMV } from '../models/cliente-mv';
import { VehiculoMV } from '../models/vehiculo-mv';
import { MecanicoMV } from '../models/mecanico-mv';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  public title:string;
  public cliente:ClienteMV;
  public vehiculo:VehiculoMV;
  public mecanico:MecanicoMV;

  constructor() { }
}
