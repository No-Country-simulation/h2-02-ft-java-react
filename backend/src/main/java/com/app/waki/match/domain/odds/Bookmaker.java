package com.app.waki.match.domain.odds;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public  class Bookmaker {
    private Long bookmakerId;
    private String bookmakerName;

    @Embedded
    private Bet bet;
}
