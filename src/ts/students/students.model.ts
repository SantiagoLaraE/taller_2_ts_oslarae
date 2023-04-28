export type IDType = "1" | "2" | "3";
export type StudentState = "Activo" | "Inactivo";

export interface IStudent {
  estudiante_id: number;
  estudiante_tipoIdentificacion: IDType;
  estudiante_numeroIdentificacion: number;
  estudiante_nombres: string;
  estudiante_apellidos: string;
  estudiante_celular: number;
  estudiante_correo: string;
  estudiante_linkedin: string;
  estudiante_github: string;
  estudiante_estado: StudentState;
  estudiante_fechaCreacion: Date;
}
