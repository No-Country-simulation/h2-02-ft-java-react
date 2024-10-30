package com.app.waki.division.application.utils;

import com.app.waki.division.application.dto.UserRankingDto;
import com.app.waki.division.domain.UserRanking;

public class MapperDivision {

    public static UserRankingDto userRankingToDto(UserRanking user){

        return new UserRankingDto(user.getPosition(),user.getDivisionLevel().name(),user.getPoints(), user.getUsername());
    }
}
