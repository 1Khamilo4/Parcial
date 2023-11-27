package com.parcial.taller.vehiculos.Controllers;

import com.parcial.taller.vehiculos.Models.Cliente;
import com.parcial.taller.vehiculos.Repositories.ClienteRepository;
import com.parcial.taller.vehiculos.Services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/clientes")
@CrossOrigin("http://localhost:4200/")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ClienteRepository clienteRepository;
    @PostMapping("/")
    public ResponseEntity<Cliente> post_guardarCliente(@RequestBody Cliente cliente){
        Cliente clienteGuardada = clienteService.post_agregarCliente(cliente);

        return ResponseEntity.ok(clienteGuardada);
    }


    @GetMapping("/{id_cliente}")
    public Cliente get_listarClienteById(@PathVariable("id_cliente") Long id_cliente){
        return clienteService.get_obtenerCliente(id_cliente);
    }

    @GetMapping("/")
    public ResponseEntity<?> get_listarCategorias(){

        Set<Cliente> clientes_clean = clienteService.get_obtenerClientes();
        Set<Cliente> clientes = new HashSet<>();

        clientes_clean.forEach( cliente ->{
            if(cliente.isEnabled() == true){
                clientes.add(cliente);
            }
        });

        return ResponseEntity.ok(clientes);
    }

    @PutMapping("/{id}")
    public Cliente put_actualizarCliente(@PathVariable("id") Long id,@RequestBody Cliente cliente) throws Exception{
        return clienteService.put_actualizarCliente(id,cliente);
    }

    @DeleteMapping("/{id}")
    public Cliente del_eliminarCliente(@PathVariable("id") Long id) throws Exception {

        Cliente del_cliente = clienteService.get_obtenerCliente(id);
        del_cliente.setEnabled(false);

        clienteService.put_actualizarCliente(del_cliente.getId(),del_cliente);

        return del_cliente;
        //clienteService.del_eliminarCliente(id);
    }
}
