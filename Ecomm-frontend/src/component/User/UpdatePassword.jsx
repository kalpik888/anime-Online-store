import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdateGood";
import "./LoginFormStyle.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import CricketBallLoader from "../Layouts/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userAction";
// import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from "../Layouts/MetaData/MetaData";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isUpdated, error } = useSelector(
    (state) => state.profileData
  );
  // const alert = useAlert();

  // const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setisValidConfirmPassword] = useState(true);
  const handleOldPassword = (event) => {
    setOldPassword(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
    setIsValidPassword(event.target.value.length >= 8);
  };
  const handleConfirmPasswordChange = (event) => {
    setconfirmPassword(event.target.value);
    setisValidConfirmPassword(event.target.value.length >= 8);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  function updatePasswordSubmitHandler(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      // alert.error("Password and Confirm Password do not match");
      return;
    }
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  }

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
      navigate("/account");
    }
  }, [dispatch, error, alert, isUpdated, loading, navigate]);

  const isSignInDisabled = !(
    newPassword &&
    confirmPassword &&
    oldPassword &&
    isValidPassword
  );

  return (
    <>
      {loading ? (
        <CricketBallLoader />
      ) : (
    <div className={"formContainer"}>
      <MetaData title={"Update Password"} />

      <form className={"form"}>
        <Avatar className={"avatar"}>
          <SecurityUpdateGoodIcon />
        </Avatar>
        <Typography variant="h5" component="h1" className={"heading"}>
          Update Password
        </Typography>

        <TextField
          style={{ marginTop: "1rem" }}
          label="Old Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          className={`${"passwordInput"} ${"textField"}`}
          InputProps={{
            endAdornment: (
              <Button
                variant="outlined"
                className={"showPasswordButton"}
                onClick={handleShowPasswordClick}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </Button>
            ),
          }}
          value={oldPassword}
          onChange={handleOldPassword}
        />
        <TextField
          style={{ marginTop: "4rem" }}
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          className={`${"passwordInput"} ${"textField"}`}
          error={!isValidPassword && newPassword !== ""}
          helperText={
            !isValidPassword && newPassword !== ""
              ? "Password must be at least 8 characters"
              : ""
          }
          InputProps={{
            endAdornment: (
              <Button
                variant="outlined"
                className={"showPasswordButton"}
                onClick={handleShowPasswordClick}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </Button>
            ),
          }}
          value={newPassword}
          onChange={handlePasswordChange}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          error={!isValidConfirmPassword && confirmPassword !== ""}
          helperText={
            !isValidConfirmPassword && confirmPassword !== ""
              ? "Password must be at least 8 characters"
              : ""
          }
          className={`${"passwordInput"} ${"textField"}`}
          InputProps={{
            endAdornment: (
              <Button
                variant="outlined"
                className={"showPasswordButton"}
                onClick={handleShowPasswordClick}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </Button>
            ),
          }}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />

        <Button
          variant="contained"
          className={"loginButton"}
          fullWidth
          disabled={isSignInDisabled}
          style={{ marginTop: "3.5rem" }}
          onClick={updatePasswordSubmitHandler}
        >
          Update New Password
        </Button>
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: ".5rem" }}
        >
          <Link to="/account" className={"createAccount"}>
            Cancel
          </Link>
        </Typography>
      </form>
    </div>
      )}
    </>
  );
}

export default UpdatePassword;
