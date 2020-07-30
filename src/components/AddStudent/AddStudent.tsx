import React, { useState, FormEvent, useEffect } from "react";
import {
  TextField,
  Button,
  makeStyles,
  createStyles,
  Grid,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { ICreateStudentDto } from "../../types/create-student-dto.interface";
import { StudentPerformance } from "../../types/student-perform.enum";
import { submitAddStudent } from "../../redux/features/add-student";
import { useTypedSelector } from "../../redux";

const requiredMessage = "Поле обязательное";

const schema = yup.object().shape<FormState>({
  birthDate: yup.date().required(requiredMessage),
  firstname: yup.string().required(requiredMessage),
  lastName: yup.string().required(requiredMessage),
  patronymic: yup.string(),
  performance: yup.mixed().oneOf(Object.values(StudentPerformance)),
});

type FormState = ICreateStudentDto;
type ErrorsState = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  birthDate: new Date(),
  firstname: "",
  lastName: "",
  patronymic: "",
  performance: undefined,
};

const AddStudent = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const submitLoading = useTypedSelector((s) => s.addStudent.loading);
  const submitError = useTypedSelector((s) => s.addStudent.error);
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const [errors, setErrors] = useState<ErrorsState>({});

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(e);
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const changeDatePickerHandler = (date: MaterialUiPickersDate) => {
    setFormState((prev) => ({
      ...prev,
      birthDate: date?.toDate() || new Date(),
    }));
  };

  const validateForm = async () => {
    try {
      await schema.validate(formState, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors(
          error.inner.reduce((acc, err) => {
            acc[err.path] = err.message;
            return acc;
          }, {} as Record<string, string | undefined>)
        );
        return false;
      } else {
        console.error(error);
      }
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await validateForm();

    if (isValid) {
      // submit
      console.log(formState);
      dispatch(submitAddStudent(formState));
    }
  };

  useEffect(() => {
    if (!submitLoading && !submitError) {
      setFormState(initialFormState);
    }
  }, [submitLoading, submitError]);

  return (
    <form onSubmit={submitHandler}>
      <Box mb={2}>
        <Typography variant="h5">Добавить студента</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            className={classes.field}
            label="Фамилия"
            name="lastName"
            fullWidth
            value={formState.lastName}
            onChange={changeHandler}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.field}
            label="Имя"
            fullWidth
            name="firstname"
            value={formState.firstname}
            onChange={changeHandler}
            error={!!errors.firstname}
            helperText={errors.firstname}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.field}
            label="Отчество"
            fullWidth
            name="patronymic"
            value={formState.patronymic}
            onChange={changeHandler}
            error={!!errors.patronymic}
            helperText={errors.patronymic}
          />
        </Grid>
        <Grid item xs={6}>
          <KeyboardDatePicker
            fullWidth
            variant="inline"
            format="DD.MM.yyyy"
            label="Дата рождения"
            value={formState.birthDate}
            onChange={changeDatePickerHandler}
            error={!!errors.birthDate}
            helperText={errors.birthDate}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth error={!!errors.performance}>
            <InputLabel>Успеваемость</InputLabel>
            <Select
              fullWidth
              name="performance"
              value={formState.performance}
              // @ts-ignore
              onChange={changeHandler}
            >
              <MenuItem>Не указано</MenuItem>
              <MenuItem value={StudentPerformance.A}>
                {StudentPerformance.A}
              </MenuItem>
              <MenuItem value={StudentPerformance.B}>
                {StudentPerformance.B}
              </MenuItem>
              <MenuItem value={StudentPerformance.C}>
                {StudentPerformance.C}
              </MenuItem>
              <MenuItem value={StudentPerformance.D}>
                {StudentPerformance.D}
              </MenuItem>
              <MenuItem value={StudentPerformance.U}>
                {StudentPerformance.U}
              </MenuItem>
            </Select>
            {errors.performance && (
              <FormHelperText>{errors.performance}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justify="flex-end">
        <Grid item>
          <Button
            color="primary"
            variant="outlined"
            type="submit"
            disabled={submitLoading}
            className={classes.submitBtn}
          >
            {submitLoading ? <CircularProgress size={25} /> : "Добавить"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddStudent;

const useStyles = makeStyles(() =>
  createStyles({
    fieldsContainer: {
      display: "flex",
      flexWrap: "wrap",
    },
    field: {},
    submitBtn: {
      minWidth: "150px",
    },
  })
);
