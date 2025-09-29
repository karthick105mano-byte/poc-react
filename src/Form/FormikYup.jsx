import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is requiredsss"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  bio: Yup.string(),
  country: Yup.string().required("Country is required"),
  gender: Yup.string().required("Gender is required"),
  agreeTerms: Yup.bool()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

export default function FormikYupForm() {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        bio: "",
        country: "",
        gender: "",
        agreeTerms: false,
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ isSubmitting }) => (
        <Form  noValidate style={{ maxWidth: 400, margin: "auto" }}>
          {/* Name */}
          <div>
            <label>Name</label>
            <Field name="name" type="text" />
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: "red", fontSize: 12 }}
            />
          </div>

          {/* Email */}
          <div>
            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "red", fontSize: 12 }}
            />
          </div>

          {/* Password */}
          <div>
            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage
              name="password"
              component="div"
              style={{ color: "red", fontSize: 12 }}
            />
          </div>

          {/* Bio */}
          <div>
            <label>Bio</label>
            <Field name="bio" as="textarea" rows="3" />
            <ErrorMessage
              name="bio"
              component="div"
              style={{ color: "red", fontSize: 12 }}
            />
          </div>

          {/* Country */}
          <div>
            <label>Country</label>
            <Field name="country" as="select">
              <option value="">Select country</option>
              <option value="us">USA</option>
              <option value="uk">UK</option>
              <option value="in">India</option>
            </Field>
            <ErrorMessage
              name="country"
              component="div"
              style={{ color: "red", fontSize: 12 }}
            />
          </div>

          {/* Gender */}
          <div>
            <label>Gender</label>
            <div role="group" aria-labelledby="gender-group">
              <label>
                <Field type="radio" name="gender" value="male" />
                Male
              </label>
              <label>
                <Field type="radio" name="gender" value="female" />
                Female
              </label>
              <label>
                <Field type="radio" name="gender" value="other" />
                Other
              </label>
            </div>
            <ErrorMessage
              name="gender"
              component="div"
              style={{ color: "red", fontSize: 12 }}
            />
          </div>

          {/* Agree Terms */}
          <div>
            <label>
              <Field type="checkbox" name="agreeTerms" />
              I agree to the terms and conditions
            </label>
            <ErrorMessage
              name="agreeTerms"
              component="div"
              style={{ color: "red", fontSize: 12 }}
            />
          </div>

          {/* Submit */}
          <div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
