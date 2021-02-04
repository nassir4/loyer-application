package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.LogementDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.Logement}.
 */
public interface LogementService {

    /**
     * Save a logement.
     *
     * @param logementDTO the entity to save.
     * @return the persisted entity.
     */
    LogementDTO save(LogementDTO logementDTO);

    /**
     * Get all the logements.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LogementDTO> findAll(Pageable pageable);


    /**
     * Get the "id" logement.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LogementDTO> findOne(Long id);

    /**
     * Delete the "id" logement.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
