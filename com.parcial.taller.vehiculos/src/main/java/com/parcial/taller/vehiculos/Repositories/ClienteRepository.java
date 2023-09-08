package com.parcial.taller.vehiculos.Repositories;

import com.parcial.taller.vehiculos.Models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
