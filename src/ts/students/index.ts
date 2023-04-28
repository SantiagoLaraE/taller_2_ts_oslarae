import { createStudentCheck, updateStudentCheck } from "../forms";
import { modalCreateBT } from "../modals";
import { tableBody } from "../nodes";
import { showNotificationMessage } from "../notifications";
import Token from "../token";
import { getStudentsDTO } from "./students.dto";
import { IStudent, StudentState } from "./students.model";
import { StudentService } from "./students.service";
import { generateStudentTemplate } from "./students.template";

const token = Token.getToken();
const studentsService = new StudentService(token);

export const getStudents = async (): Promise<getStudentsDTO[]> => {
  setLoading(true);
  try {
    const students = await studentsService.getAll();
    setLoading(false);
    return students;
  } catch (error) {
    showNotificationMessage(`${error}`, "danger");
    setLoading(false);
    return [];
  }
};

export const renderStudents = async () => {
  const students = await getStudents();
  const fragment = new DocumentFragment();
  tableBody.innerHTML = "";

  if (students.length > 0) {
    students.forEach((student) => {
      const studentTemplate = generateStudentTemplate(student);
      fragment.appendChild(studentTemplate);
    });

    tableBody.appendChild(fragment);
  } else {
    tableBody.innerHTML =
      "<tr><td class='no-students' colspan='100%'>No hay estudiantes creados</td></tr>";
  }
};

export const createStudent = async (event: SubmitEvent) => {
  setLoading(true);
  const student = createStudentCheck(event);
  if (student) {
    try {
      const response = await studentsService.create(student);
      showNotificationMessage(`${response?.message}`, "success");
      renderStudents();
      modalCreateBT.hide();
    } catch (error) {
      showNotificationMessage(`${error}`, "danger");
    }
  }
  setLoading(false);
};

export const findOneStudent = async (
  id: IStudent["estudiante_id"]
): Promise<IStudent | undefined> => {
  setLoading(true);
  try {
    const student = await studentsService.findOne(id);
    setLoading(false);
    return student;
  } catch (error) {
    showNotificationMessage(`${error}`, "danger");
    setLoading(false);
    return undefined;
  }
};

export const updateStudent = async (event: SubmitEvent) => {
  setLoading(true);
  const student = updateStudentCheck(event);
  if (!student) {
    showNotificationMessage("No hubieron cambios", "warning");
  } else {
    try {
      const response = await studentsService.update(
        student.id,
        student.changes
      );
      if (response) {
        showNotificationMessage(
          "El estudiante ha sido actualizado correctamente",
          "success"
        );
        renderStudents();
      }
    } catch (error) {
      showNotificationMessage(`${error}`, "danger");
    }
  }
  setLoading(false);
};

export const updateStateStudent = async (
  id: IStudent["estudiante_id"],
  state: boolean
) => {
  setLoading(true);
  let studentState: StudentState;
  state ? (studentState = "Activo") : (studentState = "Inactivo");
  try {
    const response = await studentsService.updateState(id, studentState);
    console.log(response);
    if (response) {
      showNotificationMessage(
        "El estado del estudiante ha sido actualizado exitosamente",
        "success"
      );
      renderStudents();
    }
  } catch (error) {
    showNotificationMessage(`${error}`, "danger");
  }

  setLoading(false);
};

export const setLoading = (loading: boolean) => {
  loading
    ? tableBody.classList.add("loading")
    : tableBody.classList.remove("loading");
};
