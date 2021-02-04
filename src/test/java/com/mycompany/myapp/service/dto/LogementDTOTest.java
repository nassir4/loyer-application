package com.mycompany.myapp.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class LogementDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LogementDTO.class);
        LogementDTO logementDTO1 = new LogementDTO();
        logementDTO1.setId(1L);
        LogementDTO logementDTO2 = new LogementDTO();
        assertThat(logementDTO1).isNotEqualTo(logementDTO2);
        logementDTO2.setId(logementDTO1.getId());
        assertThat(logementDTO1).isEqualTo(logementDTO2);
        logementDTO2.setId(2L);
        assertThat(logementDTO1).isNotEqualTo(logementDTO2);
        logementDTO1.setId(null);
        assertThat(logementDTO1).isNotEqualTo(logementDTO2);
    }
}
