package com.mycompany.myapp.service.mapper;


import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.AdresseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Adresse} and its DTO {@link AdresseDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AdresseMapper extends EntityMapper<AdresseDTO, Adresse> {



    default Adresse fromId(Long id) {
        if (id == null) {
            return null;
        }
        Adresse adresse = new Adresse();
        adresse.setId(id);
        return adresse;
    }
}
