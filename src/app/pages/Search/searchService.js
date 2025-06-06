import axios from "axios";
import { API_URL } from "../../../bkUrl";

export const getSearchResult = async (keyword) => {
  try {
    const res = await axios.get(
      `${API_URL}/search/all?keyword=${keyword}&page=1&size=10`
    );
    console.log("search này: ", res);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi search:", error);
    return error;
  }
};
