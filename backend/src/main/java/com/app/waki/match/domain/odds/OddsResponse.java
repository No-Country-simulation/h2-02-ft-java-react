package com.app.waki.match.domain.odds;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class OddsResponse {
    @JsonProperty("response")
    private List<OddsData> response;

    @Data
    public static class OddsData {
        private Fixture fixture;
        private String update;
        private Bookmaker bookmaker;

        @Data
        public static class Fixture {
            private Long id;
            private String timezone;
            private String date;
            private Long timestamp;
        }

        @Data
        public static class Bookmaker {
            private String name;
            private Bet bet;

            @Data
            public static class Bet {
                private String name;
                private List<Value> values;

                @Data
                public static class Value {
                    private String value;
                    private String odd;
                }
            }
        }
    }
}
