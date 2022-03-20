import axios from "axios";

export const findCEP = async (zipcode) => {
  const BASE_URL = `https://viacep.com.br/ws/${zipcode}/json/`;

  const res = await axios.get(BASE_URL);

  return res.data;
};
