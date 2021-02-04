package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Logement;
import com.mycompany.myapp.repository.LogementRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Logement}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LogementResource {

    private final Logger log = LoggerFactory.getLogger(LogementResource.class);

    private static final String ENTITY_NAME = "logement";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LogementRepository logementRepository;

    public LogementResource(LogementRepository logementRepository) {
        this.logementRepository = logementRepository;
    }

    /**
     * {@code POST  /logements} : Create a new logement.
     *
     * @param logement the logement to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new logement, or with status {@code 400 (Bad Request)} if the logement has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/logements")
    public ResponseEntity<Logement> createLogement(@RequestBody Logement logement) throws URISyntaxException {
        log.debug("REST request to save Logement : {}", logement);
        if (logement.getId() != null) {
            throw new BadRequestAlertException("A new logement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Logement result = logementRepository.save(logement);
        return ResponseEntity.created(new URI("/api/logements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /logements} : Updates an existing logement.
     *
     * @param logement the logement to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated logement,
     * or with status {@code 400 (Bad Request)} if the logement is not valid,
     * or with status {@code 500 (Internal Server Error)} if the logement couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/logements")
    public ResponseEntity<Logement> updateLogement(@RequestBody Logement logement) throws URISyntaxException {
        log.debug("REST request to update Logement : {}", logement);
        if (logement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Logement result = logementRepository.save(logement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, logement.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /logements} : get all the logements.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of logements in body.
     */
    @GetMapping("/logements")
    public List<Logement> getAllLogements() {
        log.debug("REST request to get all Logements");
        return logementRepository.findAll();
    }

    /**
     * {@code GET  /logements/:id} : get the "id" logement.
     *
     * @param id the id of the logement to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the logement, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/logements/{id}")
    public ResponseEntity<Logement> getLogement(@PathVariable Long id) {
        log.debug("REST request to get Logement : {}", id);
        Optional<Logement> logement = logementRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(logement);
    }

    /**
     * {@code DELETE  /logements/:id} : delete the "id" logement.
     *
     * @param id the id of the logement to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/logements/{id}")
    public ResponseEntity<Void> deleteLogement(@PathVariable Long id) {
        log.debug("REST request to delete Logement : {}", id);
        logementRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
