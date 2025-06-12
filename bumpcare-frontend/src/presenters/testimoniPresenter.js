import testimoniModel from '../models/testimoniModel';

export const submitTestimoni = async (payload) => {
  const { data, error } = await testimoniModel.createTestimoni(payload);
  if (error) throw new Error(error);
  return data;
};

export const fetchAllTestimoni = async () => {
  const { data, error } = await testimoniModel.getAllTestimoni();
  if (error) throw new Error(error);
  return data;
};
