import "../scss/main.scss";
import { btnRemoveSession, modals } from "./nodes";
import { renderStudents } from "./students";
import Token from "./token";
import { Modal } from "bootstrap";

!Token.validateSessionToken() ? window.location.replace("/login/") : null;

renderStudents();

btnRemoveSession.addEventListener("click", Token.removeSession);

modals.forEach((modal) => {
  new Modal(modal);
});
