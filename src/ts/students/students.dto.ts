import { IStudent } from "./students.model";

export interface getStudentsDTO extends Omit<IStudent, "estudiante_tipoIdentificacion" | "estudiante_numeroIdentificacion"> {}
