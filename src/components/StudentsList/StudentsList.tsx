import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { List } from "@material-ui/core";
import {
  fetchStudendsList,
  studentsListSelector,
} from "../../redux/features/students";
import { useTypedSelector } from "../../redux";
import StudentsListItem from "../StudentsListItem";

const StudentsList = () => {
  const dispatch = useDispatch();

  const studentsList = useTypedSelector(studentsListSelector);

  useEffect(() => {
    dispatch(fetchStudendsList());
  }, [dispatch]);

  return (
    <List>
      {studentsList.map((student) => (
        <StudentsListItem key={student.id} student={student} />
      ))}
    </List>
  );
};

export default StudentsList;
