import { Modal } from "bootstrap";
import { createStudentDTO } from "../students/students.dto";
import { modalCreateBT } from "../modals";

export const createStudentCheck = (
  event: SubmitEvent
): createStudentDTO | null => {
  event.preventDefault();
  event.stopPropagation();
  const form = event.target as HTMLFormElement;

  form.classList.add("was-validated");

  if (form.checkValidity()) {
    const newStudent = formDataToCreateStudentDTO(form);

    resetForm(form, modalCreateBT);
    return newStudent;
  }

  return null;
};

const formDataToCreateStudentDTO = (
  form: HTMLFormElement
): createStudentDTO => {
  const formData = new FormData(form);
  const object: createStudentDTO = {
    tipoIdentificacion: Number(formData.get("tipoIdentificacion")),
    numeroIdentificacion: Number(formData.get("numeroIdentificacion")),
    nombres: formData.get("nombres") as string,
    apellidos: formData.get("apellidos") as string,
    celular: Number(formData.get("celular")),
    correo: formData.get("correo") as string,
    linkedin: formData.get("linkedin") as string,
    github: formData.get("github") as string,
  };

  return object;
};

const resetForm = (form: HTMLFormElement, modal: Modal) => {
  form.reset();
  modal.hide();
  form.classList.remove("was-validated");
  const fields = form.querySelectorAll("*[data-value]");
  fields.forEach((field) => {
    field.removeAttribute("data-value");
  });
};
