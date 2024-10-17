package com.app.waki.match.application;

import lombok.Data;

@Data
public class MatchAreaCompetitionDTO {
    private String areaName;
    private String areaCode;
    private String areaFlag;
    private String competitionName;
    private String competitionCode;
    private String competitionEmblem;


    public MatchAreaCompetitionDTO(String areaName, String areaCode, String areaFlag,String competitionName, String competitionCode, String competitionEmblem) {
        this.areaName = areaName;
        this.areaCode = areaCode;
        this.areaFlag = areaFlag;
        this.competitionName = competitionName;
        this.competitionCode = competitionCode;
        this.competitionEmblem = competitionEmblem;
    }
}
