import calculatorModel from '../models/calculatorModel';

export async function calculateNutrition(payload) {
  return await calculatorModel.calculateNutrition(payload);
}

export async function fetchRecords() {
  return await calculatorModel.fetchRecords();
}
