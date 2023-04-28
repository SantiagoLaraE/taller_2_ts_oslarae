import "../scss/main.scss";
import { btnRemoveSession, formCreateStudent, formUpdateStudent} from "./nodes";
import { createStudent, renderStudents, updateStudent } from "./students";
import Token from "./token";

!Token.validateSessionToken() ? window.location.replace("/login/") : null;

renderStudents();

formCreateStudent.addEventListener("submit", createStudent);

formUpdateStudent.addEventListener("submit", updateStudent);

btnRemoveSession.addEventListener("click", Token.removeSession);

