package com.app.waki.division.domain;

import com.app.waki.division.domain.valueObject.DivisionId;
import com.app.waki.division.domain.valueObject.DivisionLevel;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Division {

    @Id
    private DivisionId id;
    @Enumerated(EnumType.STRING)
    private DivisionLevel division;
    @OneToMany(mappedBy = "division", cascade = CascadeType.ALL)
    private Set<UserRanking> rankings = new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Prize> prizes = new HashSet<>();
}
