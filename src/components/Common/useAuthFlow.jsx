import * as userRegistryService from "../../api/Apicall";

export const checkAuth = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const resultUser = await userRegistryService.getAuthUser();
    if (resultUser?.email) {
      return token;
    } else {
      localStorage.removeItem("token");
    }
    window.location.reload();
  }
};
