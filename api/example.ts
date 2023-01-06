import { axios } from "../config/axios";

import { ApiResource } from "../enums/ApiResource";

export const userApi = () => ({
  get: () => axios.get(`${ApiResource.EXAMPLE_API}`),
});
