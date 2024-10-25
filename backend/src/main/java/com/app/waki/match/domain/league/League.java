package com.app.waki.match.domain.league;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class League {
    @Id
    private Long id;
    private String name;
    private String type;
    private String logo;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "name", column = @Column(name = "country_name")),
            @AttributeOverride(name = "code", column = @Column(name = "country_code")),
            @AttributeOverride(name = "flag", column = @Column(name = "country_flag"))
    })
    private Country country = new Country();
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "season", joinColumns = @JoinColumn(name = "league_id"))
    private List<Season> seasons;
}
