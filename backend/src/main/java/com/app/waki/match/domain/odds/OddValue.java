package com.app.waki.match.domain.odds;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OddValue {
    private String homeOdd;
    private String drawOdd;
    private String awayOdd;
}