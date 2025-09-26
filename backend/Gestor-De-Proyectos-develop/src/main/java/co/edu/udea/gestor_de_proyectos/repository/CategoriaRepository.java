package co.edu.udea.gestor_de_proyectos.repository;

import co.edu.udea.gestor_de_proyectos.entity.Categorias;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa@dev-codes.io
 * @version Id: <b>gestor-de-proyectos</b> 30/08/2025, 8:46 a. m.
 **/
@Repository
public interface CategoriaRepository extends MongoRepository<Categorias, String> {
}
