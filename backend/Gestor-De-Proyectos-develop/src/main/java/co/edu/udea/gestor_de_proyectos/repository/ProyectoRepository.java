package co.edu.udea.gestor_de_proyectos.repository;

import co.edu.udea.gestor_de_proyectos.entity.Proyecto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProyectoRepository extends MongoRepository<Proyecto, String> {

    List<Proyecto> findAllByUserId (String userId);

    Page<Proyecto> findByFechaInicioBetweenAndEstado(LocalDate fechaInicioDesde, LocalDate fechaInicioHasta, String estado, Pageable pageable);

    // Búsqueda insensible a mayúsculas por nombre o userId
    @Query("{ '$or': [ { 'nombre': { $regex: ?0, $options: 'i' } }, { 'userId': { $regex: ?0, $options: 'i' } } ] }")
    Page<Proyecto> buscarPorTermino(String termino, Pageable pageable);
}