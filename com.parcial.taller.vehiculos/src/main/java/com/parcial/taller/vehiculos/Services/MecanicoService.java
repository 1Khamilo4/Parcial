package com.parcial.taller.vehiculos.Services;

import com.parcial.taller.vehiculos.Models.Cliente;
import com.parcial.taller.vehiculos.Models.Mecanico;
import com.parcial.taller.vehiculos.Repositories.MecanicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class MecanicoService {
    @Autowired
    private MecanicoRepository mecanicoRepository;
    public Mecanico post_agregarMecanico(Mecanico mecanico){
        return mecanicoRepository.save(mecanico);
    }

    public Mecanico put_actualizarMecanico(Long id, Mecanico mecanico) throws Exception{
        Optional<Mecanico> mecanicoOptional = mecanicoRepository.findById(id);

        if(!mecanicoOptional.isPresent()){
            throw new Exception("");
        }
        mecanico.setId(mecanicoOptional.get().getId());

        return mecanicoRepository.save(mecanico);
    }

    public Set<Mecanico> get_obtenerMecanicos(){
        return new LinkedHashSet<>(mecanicoRepository.findAll());
    }

    public Mecanico get_obtenerMecanico(Long id){
        return mecanicoRepository.findById(id).get();
    }

    public void del_eliminarMecanico(Long id) {
        Mecanico mecanico = new Mecanico();

        mecanico.setId(id);
        mecanicoRepository.delete(mecanico);
    }
}
