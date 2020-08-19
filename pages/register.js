import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import dayjs from "dayjs";
import Layout from "../components/Layout";
import { FormikTextField, FormikPicker } from "../components/forms/Utils";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  dob: dayjs().format("YYYY-MM-DD"),
  password: "",
  passwordConfirm: "",
  mobile: "",
};

const validation = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  dob: Yup.date(),
  password: Yup.string()
    .required("Required")
    .min(6, "Must be greater than 6 characters"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password do not match")
    .required("Password confirm required"),
  mobile: Yup.string().min(5),
});

function register(props) {
  const handleSubmit = React.useCallback(() => {});
  return (
    <Layout>
      <div className="flex flex-col font-sans overflow-auto w-full items-center">
        <div className="w-1/3 flex items-center justify-center p-16">
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            <Form className="w-full">
              <div className="flex flex-col space-y-8">
                <div className="w-full">
                  <p className="text-xl text-center font-semibold">Register</p>
                </div>
                <FormikTextField
                  className="w-full"
                  label="First Name"
                  name="firstName"
                />
                <FormikTextField
                  className="w-full"
                  label="Last Name"
                  name="lastName"
                />
                <FormikTextField
                  className="w-full"
                  label="Email"
                  name="email"
                />
                <FormikTextField
                  className="w-full"
                  label="Password"
                  name="password"
                  type="password"
                />
                <FormikTextField
                  className="w-full"
                  label="Password Confirm"
                  name="passwordConfirm"
                  type="password"
                />
                <FormikPicker
                  dateTime={false}
                  name="dob"
                  label="Date of birth"
                  format="YYYY-MM-DD"
                />
                <Button
                  variant="contained"
                  color="primary"
                  aria-label="Register"
                  type="submit"
                >
                  Register
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

register.propTypes = {};

export default register;
