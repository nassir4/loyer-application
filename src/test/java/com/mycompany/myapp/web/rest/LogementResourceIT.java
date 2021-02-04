package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.LoyerApp;
import com.mycompany.myapp.domain.Logement;
import com.mycompany.myapp.repository.LogementRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LogementResource} REST controller.
 */
@SpringBootTest(classes = LoyerApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LogementResourceIT {

    private static final Boolean DEFAULT_ETAT = false;
    private static final Boolean UPDATED_ETAT = true;

    @Autowired
    private LogementRepository logementRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLogementMockMvc;

    private Logement logement;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Logement createEntity(EntityManager em) {
        Logement logement = new Logement()
            .etat(DEFAULT_ETAT);
        return logement;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Logement createUpdatedEntity(EntityManager em) {
        Logement logement = new Logement()
            .etat(UPDATED_ETAT);
        return logement;
    }

    @BeforeEach
    public void initTest() {
        logement = createEntity(em);
    }

    @Test
    @Transactional
    public void createLogement() throws Exception {
        int databaseSizeBeforeCreate = logementRepository.findAll().size();
        // Create the Logement
        restLogementMockMvc.perform(post("/api/logements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(logement)))
            .andExpect(status().isCreated());

        // Validate the Logement in the database
        List<Logement> logementList = logementRepository.findAll();
        assertThat(logementList).hasSize(databaseSizeBeforeCreate + 1);
        Logement testLogement = logementList.get(logementList.size() - 1);
        assertThat(testLogement.isEtat()).isEqualTo(DEFAULT_ETAT);
    }

    @Test
    @Transactional
    public void createLogementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = logementRepository.findAll().size();

        // Create the Logement with an existing ID
        logement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLogementMockMvc.perform(post("/api/logements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(logement)))
            .andExpect(status().isBadRequest());

        // Validate the Logement in the database
        List<Logement> logementList = logementRepository.findAll();
        assertThat(logementList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLogements() throws Exception {
        // Initialize the database
        logementRepository.saveAndFlush(logement);

        // Get all the logementList
        restLogementMockMvc.perform(get("/api/logements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(logement.getId().intValue())))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getLogement() throws Exception {
        // Initialize the database
        logementRepository.saveAndFlush(logement);

        // Get the logement
        restLogementMockMvc.perform(get("/api/logements/{id}", logement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(logement.getId().intValue()))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingLogement() throws Exception {
        // Get the logement
        restLogementMockMvc.perform(get("/api/logements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLogement() throws Exception {
        // Initialize the database
        logementRepository.saveAndFlush(logement);

        int databaseSizeBeforeUpdate = logementRepository.findAll().size();

        // Update the logement
        Logement updatedLogement = logementRepository.findById(logement.getId()).get();
        // Disconnect from session so that the updates on updatedLogement are not directly saved in db
        em.detach(updatedLogement);
        updatedLogement
            .etat(UPDATED_ETAT);

        restLogementMockMvc.perform(put("/api/logements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLogement)))
            .andExpect(status().isOk());

        // Validate the Logement in the database
        List<Logement> logementList = logementRepository.findAll();
        assertThat(logementList).hasSize(databaseSizeBeforeUpdate);
        Logement testLogement = logementList.get(logementList.size() - 1);
        assertThat(testLogement.isEtat()).isEqualTo(UPDATED_ETAT);
    }

    @Test
    @Transactional
    public void updateNonExistingLogement() throws Exception {
        int databaseSizeBeforeUpdate = logementRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLogementMockMvc.perform(put("/api/logements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(logement)))
            .andExpect(status().isBadRequest());

        // Validate the Logement in the database
        List<Logement> logementList = logementRepository.findAll();
        assertThat(logementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLogement() throws Exception {
        // Initialize the database
        logementRepository.saveAndFlush(logement);

        int databaseSizeBeforeDelete = logementRepository.findAll().size();

        // Delete the logement
        restLogementMockMvc.perform(delete("/api/logements/{id}", logement.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Logement> logementList = logementRepository.findAll();
        assertThat(logementList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
