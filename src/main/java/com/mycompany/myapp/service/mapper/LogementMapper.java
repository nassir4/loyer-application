package com.mycompany.myapp.service.mapper;


import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.LogementDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Logement} and its DTO {@link LogementDTO}.
 */
@Mapper(componentModel = "spring", uses = {AdresseMapper.class})
public interface LogementMapper extends EntityMapper<LogementDTO, Logement> {

    @Mapping(source = "adresse.id", target = "adresseId")
    LogementDTO toDto(Logement logement);

    @Mapping(source = "adresseId", target = "adresse")
    Logement toEntity(LogementDTO logementDTO);

    default Logement fromId(Long id) {
        if (id == null) {
            return null;
        }
        Logement logement = new Logement();
        logement.setId(id);
        return logement;
    }
}
