import axios from "axios";
import { APIURL } from "./Utils/constants";

export const getProductsData = async () => {
  const response = await axios.get(APIURL);
  return response.data.products;
};
