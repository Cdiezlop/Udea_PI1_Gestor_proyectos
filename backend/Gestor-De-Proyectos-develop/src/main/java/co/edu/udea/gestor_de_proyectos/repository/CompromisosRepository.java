package co.edu.udea.gestor_de_proyectos.repository;

import co.edu.udea.gestor_de_proyectos.entity.Compromisos;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompromisosRepository extends MongoRepository<Compromisos, String> {
}
