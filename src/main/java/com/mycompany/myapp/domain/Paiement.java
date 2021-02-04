package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * not an ignored comment
 */
@Entity
@Table(name = "paiement")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Paiement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "loyer", nullable = false)
    private Integer loyer;

    @NotNull
    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @NotNull
    @Column(name = "duree", nullable = false)
    private Integer duree;

    @ManyToOne
    @JsonIgnoreProperties(value = "paiements", allowSetters = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = "paiements", allowSetters = true)
    private Logement logement;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLoyer() {
        return loyer;
    }

    public Paiement loyer(Integer loyer) {
        this.loyer = loyer;
        return this;
    }

    public void setLoyer(Integer loyer) {
        this.loyer = loyer;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public Paiement dateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Integer getDuree() {
        return duree;
    }

    public Paiement duree(Integer duree) {
        this.duree = duree;
        return this;
    }

    public void setDuree(Integer duree) {
        this.duree = duree;
    }

    public User getUser() {
        return user;
    }

    public Paiement user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Logement getLogement() {
        return logement;
    }

    public Paiement logement(Logement logement) {
        this.logement = logement;
        return this;
    }

    public void setLogement(Logement logement) {
        this.logement = logement;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Paiement)) {
            return false;
        }
        return id != null && id.equals(((Paiement) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Paiement{" +
            "id=" + getId() +
            ", loyer=" + getLoyer() +
            ", dateDebut='" + getDateDebut() + "'" +
            ", duree=" + getDuree() +
            "}";
    }
}
