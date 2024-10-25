package com.app.waki.match.domain.odds;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bet {

    private String betName;

    @Embedded
    private OddValue values;
}


