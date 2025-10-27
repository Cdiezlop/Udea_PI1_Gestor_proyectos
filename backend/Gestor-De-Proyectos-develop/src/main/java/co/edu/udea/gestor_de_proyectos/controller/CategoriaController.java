package co.edu.udea.gestor_de_proyectos.controller;

import co.edu.udea.gestor_de_proyectos.model.categoria.CategoriaModel;
import co.edu.udea.gestor_de_proyectos.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa@dev-codes.io
 * @version Id: <b>gestor-de-proyectos</b> 01/09/2025, 9:06 a. m.
 **/
@RestController
@RequestMapping("/api/categorias")
@RequiredArgsConstructor
public class CategoriaController {

    private final CategoriaService categoriaService;
    @GetMapping("/listar")
    public ResponseEntity<List<CategoriaModel>> listarCategorias() {
        List<CategoriaModel> categorias = categoriaService.findAll();
        return ResponseEntity.ok(categorias);
    }


}
