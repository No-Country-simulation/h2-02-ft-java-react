package com.app.waki.match.domain.fixture;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Id;
import lombok.Data;

@Embeddable
@Data
public class Venue {
    @Id
    private Long id;
    private String venueName;
    private String city;
}
