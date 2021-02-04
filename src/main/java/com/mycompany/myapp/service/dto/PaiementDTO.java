package com.mycompany.myapp.service.dto;

import io.swagger.annotations.ApiModel;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Paiement} entity.
 */
@ApiModel(description = "not an ignored comment")
public class PaiementDTO implements Serializable {
    
    private Long id;

    @NotNull
    private Integer loyer;

    @NotNull
    private LocalDate dateDebut;

    @NotNull
    private Integer duree;


    private Long userId;

    private Long logementId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLoyer() {
        return loyer;
    }

    public void setLoyer(Integer loyer) {
        this.loyer = loyer;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Integer getDuree() {
        return duree;
    }

    public void setDuree(Integer duree) {
        this.duree = duree;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getLogementId() {
        return logementId;
    }

    public void setLogementId(Long logementId) {
        this.logementId = logementId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PaiementDTO)) {
            return false;
        }

        return id != null && id.equals(((PaiementDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PaiementDTO{" +
            "id=" + getId() +
            ", loyer=" + getLoyer() +
            ", dateDebut='" + getDateDebut() + "'" +
            ", duree=" + getDuree() +
            ", userId=" + getUserId() +
            ", logementId=" + getLogementId() +
            "}";
    }
}
