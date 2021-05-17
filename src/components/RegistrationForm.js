import React from "react";
import { Formik, Form } from "formik";
import { InputFields } from "./InputFields";
import * as Yup from "yup";

export const RegistrationForm = () => {
  const phonenumber =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\]?[0-9]{3}[-\s\]?[0-9]{4,6}$/im;
  const validate = Yup.object({
    firstName: Yup.string()
      .min(3, "Must be 3 characters or less")
      .max(16, "Must be 16 characters or less")
      .required("Required *"),
    lastName: Yup.string()
      .min(3, "Must be 3 characters or less")
      .max(16, "Must be 16 characters or less")
      .required("Required *"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    contact: Yup.string()
      .min(10, "Enter valid mobile number")
      .required("Phone number is required *")
      .matches(phonenumber, "Inter valid mobile number"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required *"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required *"),
  });
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form style={{ width: "20rem" }}>
            <InputFields label="First Name" name="firstName" type="text" />
            <InputFields label="last Name" name="lastName" type="text" />
            <InputFields label="Email" name="email" type="email" />
            <InputFields label="Contact" name="contact" type="" />
            <InputFields label="password" name="password" type="password" />
            <InputFields
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <button
              className="btn btn-dark mt-3"
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Submit
            </button>
            {/* <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button> */}
          </Form>
        </div>
      )}
    </Formik>
  );
};
