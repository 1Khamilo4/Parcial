package com.parcial.taller.vehiculos.Controllers;

import com.parcial.taller.vehiculos.Models.Cliente;
import com.parcial.taller.vehiculos.Models.Mecanico;
import com.parcial.taller.vehiculos.Models.Vehiculo;
import com.parcial.taller.vehiculos.Services.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/vehiculos")
@CrossOrigin("http://localhost:4200/")
public class VehiculoController {
    @Autowired
    private VehiculoService vehiculoService;

    @PostMapping("/")
    public ResponseEntity<Vehiculo> post_guardarVehiculo(@RequestBody Vehiculo vehiculo){
        Vehiculo vehiculoGuardada = vehiculoService.post_agregarVehiculo(vehiculo);

        return ResponseEntity.ok(vehiculoGuardada);
    }


    @GetMapping("/{id}")
    public Vehiculo get_listarVehiculoById(@PathVariable("id") Long id){
        return vehiculoService.get_obtenerVehiculo(id);
    }

    @GetMapping("/")
    public ResponseEntity<?> get_listarVehiculos(){

        Set<Vehiculo> vehiculos_clean = vehiculoService.get_obtenerVehiculos();
        Set<Vehiculo> vehiculos = new HashSet<>();

        vehiculos_clean.forEach( vehiculo ->{
            if(vehiculo.isEnabled() == true){
                vehiculos.add(vehiculo);
            }
        });
        return ResponseEntity.ok(vehiculos);
    }

    @PutMapping("/{id}")
    public Vehiculo put_actualizarMecanico(@PathVariable("id") Long id,@RequestBody Vehiculo vehiculo) throws Exception{
        return vehiculoService.put_actualizarVehiculo(id,vehiculo);
    }

    @DeleteMapping("/{id}")
    public Vehiculo del_eliminarMecanico(@PathVariable("id") Long id) throws Exception {

        Vehiculo del_vehiculo = vehiculoService.get_obtenerVehiculo(id);
        del_vehiculo.setEnabled(false);

        vehiculoService.put_actualizarVehiculo(del_vehiculo.getId(), del_vehiculo);

        return del_vehiculo;
        //vehiculoService.del_eliminarVehiculo(id);
    }
}