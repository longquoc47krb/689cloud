import * as Yup from "yup";
import moment from "moment";
const validateUserForm = Yup.object().shape({
  name: Yup.string().required("Required").max(64, "Max length 64"),
  contractStart: Yup.date()
    .required("Required")
    .min(moment(), "Min date is today")
    .max(Yup.ref("contractEnd"), "Max date is contract end"),
  contractEnd: Yup.date()
    .required("Required")
    .when(
      "contractStart",
      (contractStart, yupSchema) =>
        contractStart &&
        yupSchema.min(contractStart, "Min date is contract start")
    ),
  id: Yup.number().required("Required"),
  suspension: Yup.number().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Min length 8")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_@./#&+-]{6,}$/,
      "At least 1 number, at least 1 lowercase, at least 1 uppercase"
    ),
});
const validateUserGroupForm = Yup.object().shape({
  name: Yup.string().required("Required").max(64, "Max length 64"),
  maxUser: Yup.number()
    .required("Required")
    .min(10, "Min users group is 10")
    .max(100, "Max users is 100"),
  staffId: Yup.date().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Min length 8")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_@./#&+-]{6,}$/,
      "At least 1 number, at least 1 lowercase, at least 1 uppercase"
    ),
  id: Yup.string().required("Required").max(64, "Max length 64"),
  IPAddresses: Yup.array().when(["."], (IPAddresses) => {
    return Yup.array().of(
      Yup.string()
        .required("Required")
        .matches(/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/, "Invalid IP Address")
        .test("unique", "IP Address is duplicated", (values) => {
          return new Set(IPAddresses).size === IPAddresses.length;
        })
    );
  }),
});
const validateTabLayout = Yup.object().shape({
  title: Yup.string().required("Required"),
});
const validateSearchBox = Yup.object().shape({
  // searchFields: Yup.array().string(),
  label: Yup.string().required("Required"),
  operation: Yup.string().required("Required"),
  matchValues: Yup.object().shape({
    key: Yup.string().required("Required"),
    value: Yup.string().required("Required"),
  }),
});

export {
  validateUserForm,
  validateUserGroupForm,
  validateTabLayout,
  validateSearchBox,
};
