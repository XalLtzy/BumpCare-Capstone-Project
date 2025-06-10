import {
  getLatestNutritionInput,
  classifyNutrition,
} from '../models/nutritionModel';

export async function fetchLatestNutritionInput() {
  return await getLatestNutritionInput();
}

export async function submitNutritionClassification(data) {
  return await classifyNutrition(data);
}
