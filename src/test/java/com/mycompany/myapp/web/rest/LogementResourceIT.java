package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.LoyerApp;
import com.mycompany.myapp.domain.Logement;
import com.mycompany.myapp.repository.LogementRepository;
import com.mycompany.myapp.service.LogementService;
import com.mycompany.myapp.service.dto.LogementDTO;
import com.mycompany.myapp.service.mapper.LogementMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
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

    private static final Integer DEFAULT_NBRE_CHAMBE = 1;
    private static final Integer UPDATED_NBRE_CHAMBE = 2;

    private static final Float DEFAULT_SUFARCE = 1F;
    private static final Float UPDATED_SUFARCE = 2F;

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    private static final Integer DEFAULT_LOYER = 1;
    private static final Integer UPDATED_LOYER = 2;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_ETAGE = 1;
    private static final Integer UPDATED_ETAGE = 2;

    private static final Boolean DEFAULT_ASCENCEUR = false;
    private static final Boolean UPDATED_ASCENCEUR = true;

    private static final Boolean DEFAULT_GARAGE = false;
    private static final Boolean UPDATED_GARAGE = true;

    private static final Boolean DEFAULT_PISCINE = false;
    private static final Boolean UPDATED_PISCINE = true;

    private static final Boolean DEFAULT_GRENIER = false;
    private static final Boolean UPDATED_GRENIER = true;

    @Autowired
    private LogementRepository logementRepository;

    @Autowired
    private LogementMapper logementMapper;

    @Autowired
    private LogementService logementService;

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
            .nbreChambe(DEFAULT_NBRE_CHAMBE)
            .sufarce(DEFAULT_SUFARCE)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE)
            .loyer(DEFAULT_LOYER)
            .description(DEFAULT_DESCRIPTION)
            .etage(DEFAULT_ETAGE)
            .ascenceur(DEFAULT_ASCENCEUR)
            .garage(DEFAULT_GARAGE)
            .piscine(DEFAULT_PISCINE)
            .grenier(DEFAULT_GRENIER);
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
            .nbreChambe(UPDATED_NBRE_CHAMBE)
            .sufarce(UPDATED_SUFARCE)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .loyer(UPDATED_LOYER)
            .description(UPDATED_DESCRIPTION)
            .etage(UPDATED_ETAGE)
            .ascenceur(UPDATED_ASCENCEUR)
            .garage(UPDATED_GARAGE)
            .piscine(UPDATED_PISCINE)
            .grenier(UPDATED_GRENIER);
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
        LogementDTO logementDTO = logementMapper.toDto(logement);
        restLogementMockMvc.perform(post("/api/logements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(logementDTO)))
            .andExpect(status().isCreated());

        // Validate the Logement in the database
        List<Logement> logementList = logementRepository.findAll();
        assertThat(logementList).hasSize(databaseSizeBeforeCreate + 1);
        Logement testLogement = logementList.get(logementList.size() - 1);
        assertThat(testLogement.getNbreChambe()).isEqualTo(DEFAULT_NBRE_CHAMBE);
        assertThat(testLogement.getSufarce()).isEqualTo(DEFAULT_SUFARCE);
        assertThat(testLogement.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testLogement.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testLogement.getLoyer()).isEqualTo(DEFAULT_LOYER);
        assertThat(testLogement.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testLogement.getEtage()).isEqualTo(DEFAULT_ETAGE);
        assertThat(testLogement.isAscenceur()).isEqualTo(DEFAULT_ASCENCEUR);
        assertThat(testLogement.isGarage()).isEqualTo(DEFAULT_GARAGE);
        assertThat(testLogement.isPiscine()).isEqualTo(DEFAULT_PISCINE);
        assertThat(testLogement.isGrenier()).isEqualTo(DEFAULT_GRENIER);
    }

    @Test
    @Transactional
    public void createLogementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = logementRepository.findAll().size();

        // Create the Logement with an existing ID
        logement.setId(1L);
        LogementDTO logementDTO = logementMapper.toDto(logement);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLogementMockMvc.perform(post("/api/logements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(logementDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Logement in the database
        List<Logement> logementList = logementRepository.findAll();
        assertThat(logementList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNbreChambeIsRequired() throws Exception {
        int databaseSizeBeforeTest = logementRepository.findAll().size();
        // set the field null
        logement.setNbreChambe(null);

        // Create the Logement, which fails.
        LogementDTO logementDTO = logementMapper.toDto(logement);


        restLogementMockMvc.perform(post("/api/logements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(logementDTO)))
            .andExpect(status().isBadRequest());

        List<Logement> logementList = logementRepository.findAll();
        assertThat(logementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLoyerIsRequired() throws Exception {
        int databaseSizeBeforeTest = logementRepository.findAll().size();
        // set the field null
        logement.setLoyer(null);

        // Create the Logement, which fails.
        LogementDTO logementDTO = logementMapper.toDto(logement);


        restLogementMockMvc.perform(post("/api/logements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(logementDTO)))
            .andExpect(status().isBadRequest());

        List<Logement> logementList = logementRepository.findAll();
        assertThat(logementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = logementRepository.findAll().size();
        // set the field null
        logement.setDescription(null);

        // Create the Logement, which fails.
        LogementDTO logementDTO = logementMapper.toDto(logement);


        restLogementMockMvc.perform(post("/api/logements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(logementDTO)))
            .andExpect(status().isBadRequest());

        List<Logement> logementList = logementRepository.findAll();
        assertThat(logementList).hasSize(databaseSizeBeforeTest);
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
            .andExpect(jsonPath("$.[*].nbreChambe").value(hasItem(DEFAULT_NBRE_CHAMBE)))
            .andExpect(jsonPath("$.[*].sufarce").value(hasItem(DEFAULT_SUFARCE.doubleValue())))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))))
            .andExpect(jsonPath("$.[*].loyer").value(hasItem(DEFAULT_LOYER)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].etage").value(hasItem(DEFAULT_ETAGE)))
            .andExpect(jsonPath("$.[*].ascenceur").value(hasItem(DEFAULT_ASCENCEUR.booleanValue())))
            .andExpect(jsonPath("$.[*].garage").value(hasItem(DEFAULT_GARAGE.booleanValue())))
            .andExpect(jsonPath("$.[*].piscine").value(hasItem(DEFAULT_PISCINE.booleanValue())))
            .andExpect(jsonPath("$.[*].grenier").value(hasItem(DEFAULT_GRENIER.booleanValue())));
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
            .andExpect(jsonPath("$.nbreChambe").value(DEFAULT_NBRE_CHAMBE))
            .andExpect(jsonPath("$.sufarce").value(DEFAULT_SUFARCE.doubleValue()))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)))
            .andExpect(jsonPath("$.loyer").value(DEFAULT_LOYER))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.etage").value(DEFAULT_ETAGE))
            .andExpect(jsonPath("$.ascenceur").value(DEFAULT_ASCENCEUR.booleanValue()))
            .andExpect(jsonPath("$.garage").value(DEFAULT_GARAGE.booleanValue()))
            .andExpect(jsonPath("$.piscine").value(DEFAULT_PISCINE.booleanValue()))
            .andExpect(jsonPath("$.grenier").value(DEFAULT_GRENIER.booleanValue()));
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
            .nbreChambe(UPDATED_NBRE_CHAMBE)
            .sufarce(UPDATED_SUFARCE)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .loyer(UPDATED_LOYER)
            .description(UPDATED_DESCRIPTION)
            .etage(UPDATED_ETAGE)
            .ascenceur(UPDATED_ASCENCEUR)
            .garage(UPDATED_GARAGE)
            .piscine(UPDATED_PISCINE)
            .grenier(UPDATED_GRENIER);
        LogementDTO logementDTO = logementMapper.toDto(updatedLogement);

        restLogementMockMvc.perform(put("/api/logements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(logementDTO)))
            .andExpect(status().isOk());

        // Validate the Logement in the database
        List<Logement> logementList = logementRepository.findAll();
        assertThat(logementList).hasSize(databaseSizeBeforeUpdate);
        Logement testLogement = logementList.get(logementList.size() - 1);
        assertThat(testLogement.getNbreChambe()).isEqualTo(UPDATED_NBRE_CHAMBE);
        assertThat(testLogement.getSufarce()).isEqualTo(UPDATED_SUFARCE);
        assertThat(testLogement.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testLogement.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
        assertThat(testLogement.getLoyer()).isEqualTo(UPDATED_LOYER);
        assertThat(testLogement.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLogement.getEtage()).isEqualTo(UPDATED_ETAGE);
        assertThat(testLogement.isAscenceur()).isEqualTo(UPDATED_ASCENCEUR);
        assertThat(testLogement.isGarage()).isEqualTo(UPDATED_GARAGE);
        assertThat(testLogement.isPiscine()).isEqualTo(UPDATED_PISCINE);
        assertThat(testLogement.isGrenier()).isEqualTo(UPDATED_GRENIER);
    }

    @Test
    @Transactional
    public void updateNonExistingLogement() throws Exception {
        int databaseSizeBeforeUpdate = logementRepository.findAll().size();

        // Create the Logement
        LogementDTO logementDTO = logementMapper.toDto(logement);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLogementMockMvc.perform(put("/api/logements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(logementDTO)))
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
