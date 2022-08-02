import * as Yup from "yup";
import moment from "moment";
export const validateAccountSettings = Yup.object().shape({
  firstName: Yup.string().required("Required").max(64, "Max length 64"),
  lastName: Yup.string().required("Required").max(64, "Max length 64"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Min length 8")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_@./#&+-]{6,}$/,
      "At least 1 number, at least 1 lowercase, at least 1 uppercase"
    ),
});
