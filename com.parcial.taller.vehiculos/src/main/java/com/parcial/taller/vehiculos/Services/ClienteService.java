package com.parcial.taller.vehiculos.Services;

import com.parcial.taller.vehiculos.Models.Cliente;
import com.parcial.taller.vehiculos.Repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente post_agregarCliente(Cliente cliente){
        return clienteRepository.save(cliente);
    }

    public Cliente put_actualizarCliente(Long id, Cliente cliente) throws Exception{
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);

        if(!clienteOptional.isPresent()){
            throw new Exception("");
        }
        cliente.setId(clienteOptional.get().getId());

        return clienteRepository.save(cliente);
    }

    public Set<Cliente> get_obtenerClientes(){
        return new LinkedHashSet<>(clienteRepository.findAll());
    }

    public Cliente get_obtenerCliente(Long id){
        return clienteRepository.findById(id).orElse(null);
    }

    public void del_eliminarCliente(Long id) {
        Cliente cliente = new Cliente();

        cliente.setId(id);
        clienteRepository.delete(cliente);
    }


}
