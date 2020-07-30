import React from "react";
import { IStudent } from "../../types/student.interface";

type Props = {
  student: IStudent;
};

const StudentsListItem = ({ student }: Props) => {
  const { firstname, lastName, patronymic, birthDate, performance } = student;

  return (
    <li>
      {student.id}, {firstname}, {lastName}, {patronymic}, {birthDate},{" "}
      {performance}
    </li>
  );
};

export default StudentsListItem;
