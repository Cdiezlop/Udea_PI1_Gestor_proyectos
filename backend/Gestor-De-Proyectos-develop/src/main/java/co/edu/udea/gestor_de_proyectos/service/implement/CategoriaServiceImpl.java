package co.edu.udea.gestor_de_proyectos.service.implement;

import co.edu.udea.gestor_de_proyectos.entity.Categorias;
import co.edu.udea.gestor_de_proyectos.model.categoria.CategoriaModel;
import co.edu.udea.gestor_de_proyectos.repository.CategoriaRepository;
import co.edu.udea.gestor_de_proyectos.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa@dev-codes.io
 * @version Id: <b>gestor-de-proyectos</b> 30/08/2025, 9:07 a. m.
 **/
@Service
@RequiredArgsConstructor
@Slf4j
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository categoriaRepository;
    @Override
    public List<CategoriaModel> findAll() {
        List<Categorias> categorias = categoriaRepository.findAll();
        return categorias.stream().map(this::mapToModel).toList();
    }

    private CategoriaModel mapToModel(Categorias categorias) {
        CategoriaModel model = new CategoriaModel();
        model.setId(categorias.getId());
        model.setNombre(categorias.getName());
        return model;
    }
}
