package com.app.waki.prediction.infrastructure.jpa;

import com.app.waki.prediction.domain.PredictionDetails;
import com.app.waki.prediction.domain.PredictionDetailsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaPredictionDataRepository extends JpaRepository<PredictionDetails, PredictionDetailsId> {
}
