package com.parcial.taller.vehiculos.Controllers;

import com.parcial.taller.vehiculos.Models.Cliente;
import com.parcial.taller.vehiculos.Services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;


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
        return ResponseEntity.ok(clienteService.get_obtenerClientes());
    }

    @PutMapping("/{id}")
    public Cliente put_actualizarCliente(@PathVariable("id") Long id,@RequestBody Cliente cliente) throws Exception{
        return clienteService.put_actualizarCliente(id,cliente);
    }

    @DeleteMapping("/{id}")
    public void del_eliminarCliente(@PathVariable("id") Long id){
        clienteService.del_eliminarCliente(id);
    }
}
