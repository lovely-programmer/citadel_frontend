import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset, sendMail } from "../features/auth/authSlice";
import Spinner from "../components/spinner/Spinner";
import { useMultistepForm } from "../hooks/useMultistepForm";
import PersonalInfo from "../components/RegisterDetails/PersonalInfo";
import Address from "../components/RegisterDetails/Address";
import Account from "../components/RegisterDetails/Account";
import VerifyIdentity from "../components/RegisterDetails/VerifyIdentity";

function RegisterUser() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    address: "",
    account_type: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    occupation: "",
    country: "",
    city: "",
    state: "",
    zip_code: "",
    social_security: "",
    confirm_social: "",
    date_of_birth: "",
  });

  const {
    username,
    name,
    email,
    address,
    account_type,
    phoneNumber,
    password,
    confirmPassword,
    occupation,
    country,
    city,
    state,
    zip_code,
    social_security,
    confirm_social,
    date_of_birth,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    if (isSuccess) {
      dispatch(
        sendMail({
          recipient_email: email,
          recipient_name: name,
          recipient_username: username,
        })
      );
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const updateFields = (fields) => {
    setFormData((prevState) => ({
      ...prevState,
      ...fields,
    }));
  };

  const { step, steps, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <PersonalInfo {...formData} updateFields={updateFields} />,
      <Address {...formData} updateFields={updateFields} />,
      <Account {...formData} updateFields={updateFields} />,
      <VerifyIdentity {...formData} updateFields={updateFields} />,
    ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLastStep) return next();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else if (social_security !== confirm_social) {
      toast.error("SSN/TIN do not match");
    } else {
      const userData = {
        username,
        name,
        email,
        password,
        address,
        phoneNumber,
        account_type,
        country,
        state,
        city,
        zip_code,
        occupation,
        social_security,
        date_of_birth,
      };

      // dispatch(register(userData));
      console.log(userData);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__nav">
          <Link to="/">
            <h2>Citadel Choice Bank</h2>
          </Link>
        </div>

        <div className="register__form">
          <div
            style={{
              position: "absolute",
              top: "-1.5rem",
              right: "1.5rem",
              fontSize: "20px",
              background: "#6565d2",
              padding: "10px",
              color: "#fff",
            }}
          >
            <span>{currentStepIndex + 1}</span>
            <span> / </span>
            <span>{steps.length}</span>
          </div>
          <form style={{ marginTop: "30px" }} onSubmit={handleSubmit}>
            {step}

            <div className="create__account-btn">
              {!isFirstStep && (
                <button type="button" onClick={back} className="prev_button">
                  Previous
                </button>
              )}

              <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
