import { showNotificationMessage } from "../notifications";
import { createStudentDTO, getStudentsDTO } from "./students.dto";
import { IStudent } from "./students.model";

export class StudentService {
  private url_api = "https://apiestudiantes.maosystems.dev/estudiantes";

  constructor(private token: string) {}

  async getAll(): Promise<getStudentsDTO[]> {
    const options = {
      method: "GET",
      headers: { Authorization: "Bearer " + this.token },
    };

    try {
      const response = await fetch(this.url_api, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      const message = error as string;
      showNotificationMessage(message, "danger");
      return [];
    }
  }

  async create(newStudent: createStudentDTO): Promise<IStudent | undefined> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
      body: JSON.stringify(newStudent),
    };

    try {
      const response = await fetch(this.url_api, options);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      const message = error as string;
      showNotificationMessage(message, "danger");
      return undefined;
    }
  }
}
