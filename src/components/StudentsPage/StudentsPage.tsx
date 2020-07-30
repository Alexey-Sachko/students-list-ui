import React from "react";
import { Container } from "@material-ui/core";
import StudentsList from "../StudentsList";
import AddStudent from "../AddStudent";

const StudentsPage = () => {
  return (
    <Container maxWidth="sm">
      <AddStudent />
      <StudentsList />
    </Container>
  );
};

export default StudentsPage;
