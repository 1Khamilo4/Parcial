package com.parcial.taller.vehiculos.Services;

import com.parcial.taller.vehiculos.Models.Mecanico;
import com.parcial.taller.vehiculos.Models.Vehiculo;
import com.parcial.taller.vehiculos.Repositories.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class VehiculoService {
    @Autowired
    private VehiculoRepository vehiculoRepository;

    public Vehiculo post_agregarVehiculo(Vehiculo vehiculo){
        return vehiculoRepository.save(vehiculo);
    }

    public Vehiculo put_actualizarVehiculo(Long id, Vehiculo vehiculo) throws Exception{
        Optional<Vehiculo> vehiculoOptional = vehiculoRepository.findById(id);

        if(!vehiculoOptional.isPresent()){
            throw new Exception("");
        }
        vehiculo.setId(vehiculoOptional.get().getId());

        return vehiculoRepository.save(vehiculo);
    }

    public Set<Vehiculo> get_obtenerVehiculos(){
        return new LinkedHashSet<>(vehiculoRepository.findAll());
    }

    public Vehiculo get_obtenerVehiculo(Long id){
        return vehiculoRepository.findById(id).get();
    }

    public void del_eliminarVehiculo(Long id) {
        Vehiculo vehiculo = new Vehiculo();

        vehiculo.setId(id);
        vehiculoRepository.delete(vehiculo);
    }
}