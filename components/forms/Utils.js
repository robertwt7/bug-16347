import React, { useCallback, useRef } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  InputBase,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Switch,
  Button,
  Grid,
  FormLabel,
  ButtonGroup,
  Typography,
} from "@material-ui/core";
import { DateTimePicker, DatePicker, TimePicker } from "@material-ui/pickers";
import { useField, useFormikContext, FieldArray } from "formik";
import PropTypes from "prop-types";
import "./Utils.module.scss";
import * as dayjs from "dayjs";
import axios from "axios";
import { toApiUrl } from "../helpers";

// Style used locally
export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  full: {
    width: "100%",
    height: "100%",
  },
}));

function areEqual(prevProps, nextProps) {
  if (prevProps.value === nextProps.value) {
    return true;
  }
  return false;
}

export const FormikTextField = React.memo(({ className, ...props }) => {
  const classes = useStyles();
  const [field, meta] = useField(props);

  return (
    <>
      <TextField
        className={className || `${classes.margin} ${classes.instructions}`}
        {...field}
        {...props}
        FormHelperTextProps={{ error: true }}
        helperText={meta.error && meta.touched ? String(meta.error) : null}
      />
    </>
  );
}, areEqual);

FormikTextField.propTypes = {
  className: PropTypes.string,
};

export const FormikPicker = ({
  keyboard = "false",
  format = null,
  dateTime = "true",
  name,
  label,
  variant = "dialog",
  inputVariant = "standard",
}) => {
  const [field, meta] = useField(name);
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const handlePickerChange = useCallback(
    (value) => {
      // Format value according to Moment JS in YYYY-MM-DDTHH:mm:iiZ
      // Otherwise format accordingly
      const time = format ? value.format(format) : value.format();
      setFieldValue(name, time);
    },
    [format, name, setFieldValue]
  );

  return (
    <>
      {dateTime ? (
        <DateTimePicker
          keyboard={keyboard}
          className={classes.margin}
          format={format || null}
          onChange={handlePickerChange}
          name={name}
          label={label}
          variant={variant}
          inputVariant={inputVariant}
          value={field.value}
        />
      ) : (
        <DatePicker
          keyboard={keyboard}
          className={classes.margin}
          format={format || null}
          onChange={handlePickerChange}
          name={name}
          label={label}
          variant={variant}
          inputVariant={inputVariant}
          value={field.value}
        />
      )}

      {meta.touched && meta.error ? (
        <p className="text-warning">{meta.error}</p>
      ) : null}
    </>
  );
};

export const FormikTime = ({ name, label, variant }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const classes = useStyles();

  const handleTimeChange = useCallback(
    (value) => {
      setFieldValue(name, value.format("HH:mm"));
    },
    [name, setFieldValue]
  );

  return (
    <>
      <TimePicker
        className={classes.margin}
        onChange={handleTimeChange}
        name={name}
        label={label}
        variant={variant}
        value={dayjs(field.value, "HH:mm")}
      />
      {meta.error && meta.touched ? (
        <p className="text-warning">{meta.error}</p>
      ) : null}
    </>
  );
};

FormikTime.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
};

FormikPicker.propTypes = {
  keyboard: PropTypes.bool,
  format: PropTypes.string,
  dateTime: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  inputVariant: PropTypes.string,
};

export const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);
