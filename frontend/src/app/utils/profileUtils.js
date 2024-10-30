import { getProfile } from '../services/profileService';

// Esta función toma el perfil como argumento y verifica los availablePredictions
export const anyPredictionNotMax = (profile) => {
  return profile.availablePredictions.some(
    (prediction) => prediction.remainingPredictions !== 5
  );
};

export const fetchProfileAndCheckPredictions = async (profileId) => {
  try {
    const profile = await getProfile(profileId);
    const thereArePredictions = anyPredictionNotMax(profile);
    return thereArePredictions;
  } catch (error) {
    console.error('Error al verificar las predicciones:', error.message);
    return false;
  }
};
