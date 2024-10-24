package com.app.waki.division.domain;

import com.app.waki.division.domain.valueObject.UserRankingId;
import jakarta.persistence.*;
import lombok.*;

@Entity
@EqualsAndHashCode
@Getter
@Setter
@AllArgsConstructor
public class UserRanking {

    @Id
    private UserRankingId userId;
    private Integer points;
    private Integer position;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "division_id")
    private Division division;

    public UserRanking(){}
}
