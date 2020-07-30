import React from "react";
import {
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { IStudent } from "../../types/student.interface";

type Props = {
  student: IStudent;
};

const StudentsListItem = ({ student }: Props) => {
  const classes = useStyles();
  const { firstname, lastName, patronymic, birthDate, performance } = student;

  return (
    <ListItem divider>
      <ListItemAvatar>
        <Avatar>
          {firstname[0].toUpperCase()}
          {lastName[0].toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            {firstname} {lastName} {patronymic}
          </>
        }
        secondary={
          <>
            {new Date(birthDate).toLocaleDateString()} г.р. {performance}
          </>
        }
      />
      <Divider orientation="vertical" />
      <Typography
        className={classes.performanceBlock}
        variant="caption"
        color="textSecondary"
      >
        Успеваемость:{" "}
        <Typography color="textPrimary" variant="body2" component="span">
          {performance || "не указано"}
        </Typography>
      </Typography>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="comments">
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default StudentsListItem;

const useStyles = makeStyles(() =>
  createStyles({
    performanceBlock: {
      marginRight: "30px",
    },
  })
);
