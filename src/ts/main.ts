import "../scss/main.scss";
import { btnRemoveSession, modals } from "./nodes";
import Token from "./token";
import { Modal } from "bootstrap";

!Token.validateSessionToken() ? window.location.replace("/login/") : null;

btnRemoveSession.addEventListener("click", Token.removeSession);

modals.forEach((modal) => {
  new Modal(modal);
});
