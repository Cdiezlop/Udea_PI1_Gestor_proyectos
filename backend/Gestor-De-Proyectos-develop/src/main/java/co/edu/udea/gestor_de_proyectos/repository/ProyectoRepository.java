package co.edu.udea.gestor_de_proyectos.repository;

import co.edu.udea.gestor_de_proyectos.entity.Proyecto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * @author Tgl. Jhoan Villa.
 * Email: jhoan.villa
 * @version Id: <b>gestor-de-proyectos</b> 30/08/2025, 10:21 a. m.
 **/
@Repository
public interface ProyectoRepository extends MongoRepository<Proyecto, String> {

    List<Proyecto> findAllByUserId (String userId);

    Page<Proyecto> findByFechaInicioBetweenAndEstado(LocalDate fechaInicioDesde, LocalDate fechaInicioHasta, String estado, Pageable pageable);

}
