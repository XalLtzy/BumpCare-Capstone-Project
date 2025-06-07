import calculatorModel from '../models/calculatorModel';

export async function calculateNutrition(payload) {
  return await calculatorModel.calculateNutrition(payload);
}

export async function fetchRecords() {
  return await calculatorModel.fetchRecords();
}

export async function deleteRecordById(id) {
  const result = await calculatorModel.deleteRecordById(id);
  return { success: !result.error, ...result };
}

export async function fetchLatestResult() {
  return await calculatorModel.fetchLatestResult();
}
