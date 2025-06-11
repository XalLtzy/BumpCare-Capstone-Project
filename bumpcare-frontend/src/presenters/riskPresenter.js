import riskModel from '../models/riskModel';

export const submitRiskClassification = async (payload) => {
  const { data, error } = await riskModel.classifyRisk(payload);
  if (error) throw new Error(error);
  return data;
};

export const fetchRiskClassificationHistory = async () => {
  const { data, error } = await riskModel.getRiskClassificationHistory();
  if (error) throw new Error(error);
  return data;
};

export const fetchLatestRiskInput = async () => {
  const { data, error } = await riskModel.getLatestRiskClassification();
  return { data, error };
};
