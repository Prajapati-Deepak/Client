import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import {
  AdminInput,
  AdminloginStyle,
  CodeValidator,
  UnicodeValidator,
} from "../PanelStyling/adminAuthStyle";
import { useSelector } from "react-redux";
const AuthAdmin = async (data) => {
  try {
    const response = await axios.post(`http://localhost:5000/admin_verification`, data);
    return response.data;
    // console.log(response);
  } catch (err) {
    console.log(err);
  }
};
export default function AdminLogin() {
  const [error, setError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const inputRef = useRef();
  // const userData = useSelector((state) => state.loginlogoutReducer);
  const localStorageData=JSON.parse(window.localStorage.getItem("auth"))
  const token = localStorageData.token;
  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      // const data = { , token: token };
      const run = async ()=>{
        try {
          console.log("toek " + token);
          const response =
         await axios.post(
           "http://localhost:5000/admin_verification",
           { unicode: inputRef.current.value },
           {
             headers: {
               Authorization: `Bearer ${token}`,
             },
           }
         );
          console.log(response.data);
       } catch (err) {
         console.log(err);
       }
      }
      run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isSubmit]);

  const SubmitHandler = (event) => {
    event.preventDefault();
    const value = inputRef.current.value;
    setError(UnicodeValidator(value));
    setIsSubmit(true);
  };
  const classes = AdminloginStyle();
  return (
    <>
      <Box className={classes.mainBox}>
        <Box className={classes.actionBox}>
          <IconButton>
            <CloseIcon className={classes.closeIcon} />
          </IconButton>
        </Box>
        <Box className={classes.container}>
          <form onSubmit={SubmitHandler}>
            <AdminInput
              autoComplete="off"
              type="password"
              id="adminlogin"
              name="adminlogin"
              placeholder="Enter the UniCode"
              ref={inputRef}
            />
          </form>
          <CodeValidator>{error.code}</CodeValidator>
        </Box>
      </Box>
    </>
  );
}
