import { createStudentDTO, getStudentsDTO } from "./students.dto";

export class StudentService {
  private url_api = "https://apiestudiantes.maosystems.dev/estudiantes";

  constructor(private token: string) {}

  async getAll(): Promise<getStudentsDTO[]> {
    const options = {
      method: "GET",
      headers: { Authorization: "Bearer " + this.token},
    };

    const response = await fetch(this.url_api, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.data;
  }

  async create(newStudent: createStudentDTO): Promise<{message: string} | undefined> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
      body: JSON.stringify(newStudent),
    };

    const response = await fetch(this.url_api, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  }
}
