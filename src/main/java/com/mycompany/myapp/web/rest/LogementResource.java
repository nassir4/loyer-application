package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.service.LogementService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.service.dto.LogementDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Logement}.
 */
@RestController
@RequestMapping("/api")
public class LogementResource {

    private final Logger log = LoggerFactory.getLogger(LogementResource.class);

    private static final String ENTITY_NAME = "logement";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LogementService logementService;

    public LogementResource(LogementService logementService) {
        this.logementService = logementService;
    }

    /**
     * {@code POST  /logements} : Create a new logement.
     *
     * @param logementDTO the logementDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new logementDTO, or with status {@code 400 (Bad Request)} if the logement has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/logements")
    public ResponseEntity<LogementDTO> createLogement(@Valid @RequestBody LogementDTO logementDTO) throws URISyntaxException {
        log.debug("REST request to save Logement : {}", logementDTO);
        if (logementDTO.getId() != null) {
            throw new BadRequestAlertException("A new logement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LogementDTO result = logementService.save(logementDTO);
        return ResponseEntity.created(new URI("/api/logements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /logements} : Updates an existing logement.
     *
     * @param logementDTO the logementDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated logementDTO,
     * or with status {@code 400 (Bad Request)} if the logementDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the logementDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/logements")
    public ResponseEntity<LogementDTO> updateLogement(@Valid @RequestBody LogementDTO logementDTO) throws URISyntaxException {
        log.debug("REST request to update Logement : {}", logementDTO);
        if (logementDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LogementDTO result = logementService.save(logementDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, logementDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /logements} : get all the logements.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of logements in body.
     */
    @GetMapping("/logements")
    public ResponseEntity<List<LogementDTO>> getAllLogements(Pageable pageable) {
        log.debug("REST request to get a page of Logements");
        Page<LogementDTO> page = logementService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /logements/:id} : get the "id" logement.
     *
     * @param id the id of the logementDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the logementDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/logements/{id}")
    public ResponseEntity<LogementDTO> getLogement(@PathVariable Long id) {
        log.debug("REST request to get Logement : {}", id);
        Optional<LogementDTO> logementDTO = logementService.findOne(id);
        return ResponseUtil.wrapOrNotFound(logementDTO);
    }

    /**
     * {@code DELETE  /logements/:id} : delete the "id" logement.
     *
     * @param id the id of the logementDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/logements/{id}")
    public ResponseEntity<Void> deleteLogement(@PathVariable Long id) {
        log.debug("REST request to delete Logement : {}", id);
        logementService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
