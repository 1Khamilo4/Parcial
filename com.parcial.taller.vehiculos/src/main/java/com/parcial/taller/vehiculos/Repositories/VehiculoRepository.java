package com.parcial.taller.vehiculos.Repositories;

import com.parcial.taller.vehiculos.Models.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {
}
