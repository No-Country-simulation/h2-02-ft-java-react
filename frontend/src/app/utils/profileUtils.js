import { getProfile } from '../services/profileService';

// Esta función toma el perfil como argumento y verifica los availablePredictions
export const allPredictionsMax = (profile) => {
  return profile.availablePredictions.every(
    (prediction) => prediction.remainingPredictions !== 5
  );
};

export const fetchProfileAndCheckPredictions = async (profileId) => {
  try {
    const profile = await getProfile(profileId);
    const allMaxPredictions = allPredictionsMax(profile);
    return allMaxPredictions;
  } catch (error) {
    console.error('Error al verificar las predicciones:', error.message);
    return false;
  }
};
