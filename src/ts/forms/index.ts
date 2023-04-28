import { Modal } from "bootstrap";
import { createStudentDTO, updateStudentDTO } from "../students/students.dto";
import { modalCreateBT, modalUpdateBT } from "../modals";
import { IStudent } from "../students/students.model";
import { modalUpdateStudent } from "../nodes";

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

export const updateStudentCheck = (
  event: SubmitEvent
): { id: IStudent["estudiante_id"]; changes: updateStudentDTO } | null => {
  event.preventDefault();
  event.stopPropagation();

  const form = event.target as HTMLFormElement;
  form.classList.add("was-validated");

  if (form.checkValidity()) {
    const student = formDataToUpdateStudentDTO(form);
    resetForm(form, modalUpdateBT);
    if (Object.entries(student.changes).length > 0) {
      return student;
    }
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

const formDataToUpdateStudentDTO = (
  form: HTMLFormElement
): { id: IStudent["estudiante_id"]; changes: updateStudentDTO } => {
  const formData = new FormData(form);
  const id: IStudent["estudiante_id"] = Number(formData.get("id"));
  const changes = formDataToCreateStudentDTO(form);

  formData.forEach((value, key) => {
    const dataValue = form
      .querySelector(`[name=${key}]`)
      ?.getAttribute("data-value");
    if (dataValue === value) {
      const index = key as keyof updateStudentDTO;
      delete changes[index];
    }
  });

  return { changes, id };
};

export const fillUpdateForm = (student: IStudent) => {
  const fields = modalUpdateStudent.querySelectorAll(
    "*[name]"
  ) as NodeListOf<HTMLInputElement>;

  fields.forEach((field) => {
    const index = ("estudiante_" + field.name) as keyof IStudent;
    field.value = student[index].toString();
    field.dataset.value = student[index].toString();
  });
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
