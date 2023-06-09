class Token {
  static sessionKey = "students";
  constructor(private identification: number, private mail: string) {}

  async requestToken(): Promise<string | undefined> {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identificacion: this.identification,
        correo: this.mail,
      }),
    };

    try {
      const response = await fetch(
        "https://apiestudiantes.maosystems.dev/tokens",
        options
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data.token;
    } catch (error) {
      return undefined;
    }
  }

  async createSessionToken() {
    const token = await this.requestToken();

    if (token) {
      sessionStorage.setItem(Token.sessionKey, JSON.stringify(token));
      window.location.replace("../");
    }
  }

  static getToken(): string {
    const response = sessionStorage.getItem(Token.sessionKey);
    if (response !== null) {
      const token = JSON.parse(response);
      return token;
    } else {
      return "";
    }
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
