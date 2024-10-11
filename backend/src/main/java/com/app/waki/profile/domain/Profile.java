package com.app.waki.profile.domain;


import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;



@EqualsAndHashCode
@ToString
public class Profile {


    private ProfileUserId profileUserId;
    private LocalDateTime timeProfileCreated;
    @Embedded
    private TotalPoints totalPoints;

    private Map<LocalDate, Integer> availablePredictions;



}
