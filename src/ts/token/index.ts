class Token {
  static sessionKey = "students";
  constructor(private identification: number, private mail: string) {}

  async requestToken(): Promise<string | undefined> {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `{"identificacion":${this.identification},"correo":"${this.mail}"}`,
    };

    try {
      const response = await fetch(
        "https://apiestudiantes.maosystems.dev/tokens",
        options
      );
      const token = await response.text();
      return token;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async createSessionToken() {
    const token = await this.requestToken();

    if (token) {
      sessionStorage.setItem(Token.sessionKey, token);
      window.location.replace("../");
    }
  }

  getToken(): string {
    const token = sessionStorage.getItem(Token.sessionKey);
    return token !== null ? token : "";
  }

  static validateSessionToken() {
    return sessionStorage.getItem(Token.sessionKey) ? true : false;
  }

  static removeSession() {
    sessionStorage.removeItem(Token.sessionKey);
    window.location.replace("/login/");
  }
}

export default Token;