import {
  createStudentDTO,
  getStudentsDTO,
  updateStudentDTO,
} from "./students.dto";
import { IStudent } from "./students.model";

export class StudentService {
  private url_api = "https://apiestudiantes.maosystems.dev/estudiantes";

  constructor(private token: string) {}

  async getAll(): Promise<getStudentsDTO[]> {
    const options = {
      method: "GET",
      headers: { Authorization: "Bearer " + this.token },
    };

    const response = await fetch(this.url_api, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.data;
  }

  async create(newStudent: createStudentDTO): Promise<{ message: string }> {
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

  async findOne(id: IStudent["estudiante_id"]): Promise<IStudent> {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.token,
      },
    };

    const response = await fetch(`${this.url_api}/${id}`, options);
    const { data } = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data[0];
  }

  async update(
    id: IStudent["estudiante_id"],
    changes: updateStudentDTO
  ): Promise<updateStudentDTO> {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
      body: JSON.stringify(changes),
    };

    const response = await fetch(`${this.url_api}/${id}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.data;
  }
}
