package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Paiement;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Paiement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Long> {

    @Query("select paiement from Paiement paiement where paiement.user.login = ?#{principal.username}")
    List<Paiement> findByUserIsCurrentUser();
}
