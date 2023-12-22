import * as yup from "yup";

const ConfigurationsSchema = yup.object().shape({
  apiEndPoint: yup.string().required("*Field required"),
  siteByLine: yup.string().required("*Field required"),
  siteName: yup.string().required("*Field required"),
  //   bookmark: yup.string().required("*Field required"),
  //   pagination: yup.string().required("*Field required"),
  //   rating: yup.string().required("*Field required"),
  //   share: yup.string().required("*Field required"),
  //   lableTitle: yup.string().required("*Field required"),
  //   lableAuthor: yup.string().required("*Field required"),
  //   lableDesc: yup.string().required("*Field required"),
  //   lableRating: yup.string().required("*Field required"),
  //   bookmark: yup.string().required("*Field required"),
  //   pagination: yup.string().required("*Field required"),
  //   rating: yup.string().required("*Field required"),
  //   share: yup.string().required("*Field required"),
});

export default ConfigurationsSchema;
