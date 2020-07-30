import React from "react";
import StudentsList from "../StudentsList";
import { Container } from "@material-ui/core";

const StudentsPage = () => {
  return (
    <Container maxWidth="sm">
      <StudentsList />
    </Container>
  );
};

export default StudentsPage;
