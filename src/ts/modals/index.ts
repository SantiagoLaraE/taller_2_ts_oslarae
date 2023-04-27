import { Modal } from "bootstrap";
import { modalCreateStudent, modals } from "../nodes";

export const modalCreateBT = new Modal(modalCreateStudent);

modals.forEach((modal) => {
  new Modal(modal);
});
