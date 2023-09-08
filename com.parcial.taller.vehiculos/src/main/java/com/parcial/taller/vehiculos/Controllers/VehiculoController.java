package com.parcial.taller.vehiculos.Controllers;

import com.parcial.taller.vehiculos.Models.Mecanico;
import com.parcial.taller.vehiculos.Models.Vehiculo;
import com.parcial.taller.vehiculos.Services.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vehiculos")
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
    public ResponseEntity<?> get_listarMecanico(){
        return ResponseEntity.ok(vehiculoService.get_obtenerVehiculos());
    }

    @PutMapping("/{id}")
    public Vehiculo put_actualizarMecanico(@PathVariable("id") Long id,@RequestBody Vehiculo vehiculo) throws Exception{
        return vehiculoService.put_actualizarVehiculo(id,vehiculo);
    }

    @DeleteMapping("/{id}")
    public void del_eliminarMecanico(@PathVariable("id") Long id){
        vehiculoService.del_eliminarVehiculo(id);
    }
}