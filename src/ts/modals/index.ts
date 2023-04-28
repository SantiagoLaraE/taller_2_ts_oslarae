import { Modal } from "bootstrap";
import { formUpdateStudent, modalCreateStudent, modalUpdateStudent, modals } from "../nodes";
import { IStudent } from "../students/students.model";
import { findOneStudent, setLoading } from "../students";
import { fillUpdateForm } from "../forms";

export const modalCreateBT = new Modal(modalCreateStudent);
export const modalUpdateBT = new Modal(modalUpdateStudent);

export async function showUpdateModal(id: IStudent["estudiante_id"]) {
  setLoading(true);
  const student = await findOneStudent(id);

  if (student !== undefined) {
    fillUpdateForm(student);
    modalUpdateBT.show();
  }

  modalUpdateStudent.addEventListener("hidden.bs.modal", () => {
    formUpdateStudent.classList.remove("was-validated");
    formUpdateStudent.reset();
  });
  setLoading(false);
}



modals.forEach((modal) => {
  new Modal(modal);
});
