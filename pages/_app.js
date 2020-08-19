import "../styles/index.css";
import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayJsUtils from "@date-io/dayjs";

function MyApp({ Component, pageProps }) {
  return (
    <MuiPickersUtilsProvider utils={DayJsUtils}>
      <Component {...pageProps} />
    </MuiPickersUtilsProvider>
  );
}

export default MyApp;
