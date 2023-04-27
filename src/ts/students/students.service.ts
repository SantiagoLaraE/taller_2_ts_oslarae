import { getStudentsDTO } from "./students.dto";

export class StudentService{
    private url_api = "https://apiestudiantes.maosystems.dev/estudiantes";
    
    constructor(private token: string) {}

    async getAll(): Promise<getStudentsDTO[]> {
        const options = {
          method: "GET",
          headers: { Authorization: "Bearer " + this.token },
        };
    
        try {
          const response = await fetch(this.url_api, options);
          const { data } = await response.json();
          return data;
        } catch (error) {
          console.error(error);
          return [];
        }
      }
}