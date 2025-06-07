import calculatorModel from '../models/calculatorModel';

export async function fetchLatestResult() {
  return await calculatorModel.fetchLatestResult();
}
