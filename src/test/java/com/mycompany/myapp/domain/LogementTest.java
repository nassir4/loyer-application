package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class LogementTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Logement.class);
        Logement logement1 = new Logement();
        logement1.setId(1L);
        Logement logement2 = new Logement();
        logement2.setId(logement1.getId());
        assertThat(logement1).isEqualTo(logement2);
        logement2.setId(2L);
        assertThat(logement1).isNotEqualTo(logement2);
        logement1.setId(null);
        assertThat(logement1).isNotEqualTo(logement2);
    }
}
