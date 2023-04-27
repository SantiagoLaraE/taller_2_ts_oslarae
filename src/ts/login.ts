import "../scss/login.scss";
import Token from "./token";

const loginForm = document.querySelector("#login-form") as HTMLFormElement;

const loginFormCheck = (event: SubmitEvent) => {
  event.preventDefault();
  event.stopPropagation();

  if (loginForm.checkValidity()) {
    const formData = new FormData(loginForm);
    const identification = Number(formData.get("identification"));
    const mail = formData.get("mail") as string;

    const token = new Token(identification, mail);
    token.createSessionToken();

  }

  loginForm.classList.add("was-validated");
};

loginForm.addEventListener("submit", loginFormCheck);
