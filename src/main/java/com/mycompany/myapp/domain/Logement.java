package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Logement.
 */
@Entity
@Table(name = "logement")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Logement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nbre_chambe", nullable = false)
    private Integer nbreChambe;

    @Column(name = "sufarce")
    private Float sufarce;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @NotNull
    @Column(name = "loyer", nullable = false)
    private Integer loyer;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "etage")
    private Integer etage;

    @Column(name = "ascenceur")
    private Boolean ascenceur;

    @Column(name = "garage")
    private Boolean garage;

    @Column(name = "piscine")
    private Boolean piscine;

    @Column(name = "grenier")
    private Boolean grenier;

    @ManyToOne
    @JsonIgnoreProperties(value = "logements", allowSetters = true)
    private Adresse adresse;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNbreChambe() {
        return nbreChambe;
    }

    public Logement nbreChambe(Integer nbreChambe) {
        this.nbreChambe = nbreChambe;
        return this;
    }

    public void setNbreChambe(Integer nbreChambe) {
        this.nbreChambe = nbreChambe;
    }

    public Float getSufarce() {
        return sufarce;
    }

    public Logement sufarce(Float sufarce) {
        this.sufarce = sufarce;
        return this;
    }

    public void setSufarce(Float sufarce) {
        this.sufarce = sufarce;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public Logement photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public Logement photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public Integer getLoyer() {
        return loyer;
    }

    public Logement loyer(Integer loyer) {
        this.loyer = loyer;
        return this;
    }

    public void setLoyer(Integer loyer) {
        this.loyer = loyer;
    }

    public String getDescription() {
        return description;
    }

    public Logement description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getEtage() {
        return etage;
    }

    public Logement etage(Integer etage) {
        this.etage = etage;
        return this;
    }

    public void setEtage(Integer etage) {
        this.etage = etage;
    }

    public Boolean isAscenceur() {
        return ascenceur;
    }

    public Logement ascenceur(Boolean ascenceur) {
        this.ascenceur = ascenceur;
        return this;
    }

    public void setAscenceur(Boolean ascenceur) {
        this.ascenceur = ascenceur;
    }

    public Boolean isGarage() {
        return garage;
    }

    public Logement garage(Boolean garage) {
        this.garage = garage;
        return this;
    }

    public void setGarage(Boolean garage) {
        this.garage = garage;
    }

    public Boolean isPiscine() {
        return piscine;
    }

    public Logement piscine(Boolean piscine) {
        this.piscine = piscine;
        return this;
    }

    public void setPiscine(Boolean piscine) {
        this.piscine = piscine;
    }

    public Boolean isGrenier() {
        return grenier;
    }

    public Logement grenier(Boolean grenier) {
        this.grenier = grenier;
        return this;
    }

    public void setGrenier(Boolean grenier) {
        this.grenier = grenier;
    }

    public Adresse getAdresse() {
        return adresse;
    }

    public Logement adresse(Adresse adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Logement)) {
            return false;
        }
        return id != null && id.equals(((Logement) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Logement{" +
            "id=" + getId() +
            ", nbreChambe=" + getNbreChambe() +
            ", sufarce=" + getSufarce() +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", loyer=" + getLoyer() +
            ", description='" + getDescription() + "'" +
            ", etage=" + getEtage() +
            ", ascenceur='" + isAscenceur() + "'" +
            ", garage='" + isGarage() + "'" +
            ", piscine='" + isPiscine() + "'" +
            ", grenier='" + isGrenier() + "'" +
            "}";
    }
}
