import { set } from "idb-keyval";
import { axios } from "./init";

export class getData {
  data = async (type, payload = {}) => {
    const url = "/" + type;
    try {
      let res = await axios.get(url, payload);
      if (res.status === 200) {
        set(type, res.data).then();
        return res.data;
      }
      return undefined;
    } catch (error) {
      console.log(error.response);
      return undefined;
    }
  };
}
