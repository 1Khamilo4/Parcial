package com.parcial.taller.vehiculos.Controllers;

import com.parcial.taller.vehiculos.Models.Cliente;
import com.parcial.taller.vehiculos.Models.Mecanico;
import com.parcial.taller.vehiculos.Services.MecanicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mecanicos")
@CrossOrigin("http://localhost:4200/")
public class MecanicoController {
    @Autowired
    private MecanicoService mecanicoService;

    @PostMapping("/")
    public ResponseEntity<Mecanico> post_guardarMecanico(@RequestBody Mecanico mecanico){
        Mecanico mecanicoGuardada = mecanicoService.post_agregarMecanico(mecanico);

        return ResponseEntity.ok(mecanicoGuardada);
    }


    @GetMapping("/{id}")
    public Mecanico get_listarMecanicoById(@PathVariable("id") Long id){
        return mecanicoService.get_obtenerMecanico(id);
    }

    @GetMapping("/")
    public ResponseEntity<?> get_listarMecanico(){
        return ResponseEntity.ok(mecanicoService.get_obtenerMecanicos());
    }

    @PutMapping("/{id}")
    public Mecanico put_actualizarMecanico(@PathVariable("id") Long id,@RequestBody Mecanico mecanico) throws Exception{
        return mecanicoService.put_actualizarMecanico(id,mecanico);
    }

    @DeleteMapping("/{id}")
    public void del_eliminarMecanico(@PathVariable("id") Long id){
        mecanicoService.del_eliminarMecanico(id);
    }
}
