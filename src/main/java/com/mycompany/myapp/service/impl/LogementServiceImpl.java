package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.LogementService;
import com.mycompany.myapp.domain.Logement;
import com.mycompany.myapp.repository.LogementRepository;
import com.mycompany.myapp.service.dto.LogementDTO;
import com.mycompany.myapp.service.mapper.LogementMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Logement}.
 */
@Service
@Transactional
public class LogementServiceImpl implements LogementService {

    private final Logger log = LoggerFactory.getLogger(LogementServiceImpl.class);

    private final LogementRepository logementRepository;

    private final LogementMapper logementMapper;

    public LogementServiceImpl(LogementRepository logementRepository, LogementMapper logementMapper) {
        this.logementRepository = logementRepository;
        this.logementMapper = logementMapper;
    }

    @Override
    public LogementDTO save(LogementDTO logementDTO) {
        log.debug("Request to save Logement : {}", logementDTO);
        Logement logement = logementMapper.toEntity(logementDTO);
        logement = logementRepository.save(logement);
        return logementMapper.toDto(logement);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LogementDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Logements");
        return logementRepository.findAll(pageable)
            .map(logementMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<LogementDTO> findOne(Long id) {
        log.debug("Request to get Logement : {}", id);
        return logementRepository.findById(id)
            .map(logementMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Logement : {}", id);
        logementRepository.deleteById(id);
    }
}
