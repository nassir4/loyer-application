package com.mycompany.myapp.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class LogementMapperTest {

    private LogementMapper logementMapper;

    @BeforeEach
    public void setUp() {
        logementMapper = new LogementMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(logementMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(logementMapper.fromId(null)).isNull();
    }
}
