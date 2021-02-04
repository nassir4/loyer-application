package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Logement;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Logement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LogementRepository extends JpaRepository<Logement, Long> {
}
