  import nutritionModel from '../models/nutritionModel';

  export const submitNutritionClassification = async (payload) => {
    const { data, error } = await nutritionModel.classifyNutrition(payload);
    if (error) throw new Error(error);
    return data;
  };

  export const fetchClassificationHistory = async () => {
    const { data, error } = await nutritionModel.getClassificationHistory();
    if (error) throw new Error(error);
    return data;
  };

  export const fetchLatestNutritionInput = async () => {
    const { data, error } = await nutritionModel.getLatestClassification();
    return { data, error };
  };
