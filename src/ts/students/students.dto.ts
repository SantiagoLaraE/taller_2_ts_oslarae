import { IStudent } from "./students.model";

export interface getStudentsDTO
  extends Omit<IStudent, "estudiante_tipoIdentificacion" | "estudiante_numeroIdentificacion"> {}

export interface createStudentDTO {
  tipoIdentificacion: number;
  numeroIdentificacion: IStudent["estudiante_numeroIdentificacion"];
  nombres: IStudent["estudiante_nombres"];
  apellidos: IStudent["estudiante_apellidos"];
  celular: IStudent["estudiante_celular"];
  correo: IStudent["estudiante_correo"];
  linkedin: IStudent["estudiante_linkedin"];
  github: IStudent["estudiante_github"];
}

export interface updateStudentDTO extends Partial<createStudentDTO> {}