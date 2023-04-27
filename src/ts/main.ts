import "../scss/main.scss";
import { btnRemoveSession, formCreateStudent} from "./nodes";
import { createStudent, renderStudents } from "./students";
import Token from "./token";

!Token.validateSessionToken() ? window.location.replace("/login/") : null;

renderStudents();

formCreateStudent.addEventListener("submit", createStudent);

btnRemoveSession.addEventListener("click", Token.removeSession);

