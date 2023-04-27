import "../scss/main.scss";
import Token from "./token";

!Token.validateSessionToken() ? window.location.replace("/login/") : null;
