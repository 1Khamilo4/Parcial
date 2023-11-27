package com.parcial.taller.vehiculos.Controllers;

import com.parcial.taller.vehiculos.Models.Cliente;
import com.parcial.taller.vehiculos.Models.Mecanico;
import com.parcial.taller.vehiculos.Services.MecanicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

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
        Set<Mecanico> mecanicos_clean = mecanicoService.get_obtenerMecanicos();
        Set<Mecanico> mecanicos = new HashSet<>();

        mecanicos_clean.forEach( mecanico ->{
            if(mecanico.isEnabled() == true){
                mecanicos.add(mecanico);
            }
        });

        return ResponseEntity.ok(mecanicos);
    }

    @PutMapping("/{id}")
    public Mecanico put_actualizarMecanico(@PathVariable("id") Long id,@RequestBody Mecanico mecanico) throws Exception{
        return mecanicoService.put_actualizarMecanico(id,mecanico);
    }

    @DeleteMapping("/{id}")
    public Mecanico del_eliminarMecanico(@PathVariable("id") Long id) throws Exception {

        Mecanico mecanico_del = mecanicoService.get_obtenerMecanico(id);

        mecanico_del.setEnabled(false);

        mecanicoService.put_actualizarMecanico(mecanico_del.getId(), mecanico_del);

        //mecanicoService.del_eliminarMecanico(id);

        return mecanico_del;
    }
}
