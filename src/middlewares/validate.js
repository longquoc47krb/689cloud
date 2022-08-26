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
  suspension: Yup.string().required("Required"),
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
  searchFields: Yup.array().of(Yup.string()),
  title: Yup.string().required("Required"),
});
const validateSearchBox = Yup.object().shape({
  searchFields: Yup.array().required("Required"),
  label: Yup.string().required("Required"),
  operation: Yup.string().required("Required"),
  matchValues: Yup.array()
    .of(
      Yup.object().shape({
        key: Yup.string().required("Required"),
        value: Yup.string().required("Required"),
      })
    )
    .test("keyTest", "Key needs to be unique", (lists) => {
      let seen = new Set();
      var hasDuplicates = lists.some(function (currentObject) {
        return seen.size === seen.add(currentObject.key).size;
      });
      return !hasDuplicates;
    }),
});
const validateLoginForm = Yup.object().shape({
  client_ip_address: Yup.string()
    .required("Required")
    .max(64, "Max length 64")
    .matches(/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/, "Invalid IP Address"),
  company_domain: Yup.string()
    .required("Required")
    .min(8, "Min length 8")
    .matches(
      /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/,
      "Invalid domain"
    ),
});
export {
  validateLoginForm,
  validateUserForm,
  validateUserGroupForm,
  validateTabLayout,
  validateSearchBox,
};
