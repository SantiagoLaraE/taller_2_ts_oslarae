import { createStudentCheck } from "../forms";
import { modalCreateBT } from "../modals";
import { tableBody } from "../nodes";
import { showNotificationMessage } from "../notifications";
import Token from "../token";
import { StudentService } from "./students.service";
import { generateStudentTemplate } from "./students.template";

const token = Token.getToken();
const studentsService = new StudentService(token);

export const renderStudents = async () => {
  setLoading(true);
  const students = await studentsService.getAll();
  const fragment = new DocumentFragment();

  tableBody.innerHTML = "";

  if(students.length > 0 ){
    students.forEach((student) => {
        const studentTemplate = generateStudentTemplate(student);
        fragment.appendChild(studentTemplate);
      });
    
      tableBody.appendChild(fragment);
  }else{
    tableBody.innerHTML = "<tr><td class='no-students' colspan='100%'>No hay estudiantes creados</td></tr>";
  }


  setLoading(false);
};

export const createStudent = async (event: SubmitEvent) => {
  setLoading(true);
  const student = createStudentCheck(event);
  if (student) {
    try {
      const response = await studentsService.create(student);
      if (response) {
        showNotificationMessage(
          "El estudiante ha sido creado correctamente",
          "success"
        );
        renderStudents();
      }
      modalCreateBT.hide();
    } catch (error) {
      showNotificationMessage(`${error}`, "danger");
    }
  }
  setLoading(false);

};

export const setLoading = (loading: boolean) => {
  loading
    ? tableBody.classList.add("loading")
    : tableBody.classList.remove("loading");
};
