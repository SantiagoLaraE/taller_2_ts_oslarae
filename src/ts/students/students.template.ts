import { getStudentsDTO } from "./students.dto";

const editIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-pencil"
viewBox="0 0 16 16">
<path
  d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
</svg>`;

export const generateStudentTemplate = (s: getStudentsDTO) => {
  const row = document.createElement("tr");
  row.insertCell(0).innerHTML = s.estudiante_id.toString();
  row.insertCell(1).innerHTML = s.estudiante_nombres;
  row.insertCell(2).innerHTML = s.estudiante_apellidos;
  row.insertCell(3).innerHTML = s.estudiante_celular.toString();
  row.insertCell(4).innerHTML = s.estudiante_correo;
  row.insertCell(5).innerHTML = `<a href="${s.estudiante_linkedin}" class="btn btn-sm btn-outline-primary" target="_blank">Ver LinkedIn</a>`;
  row.insertCell(6).innerHTML = `<a href="${s.estudiante_github}" class="btn btn-sm btn-outline-primary" target="_blank">Ver Github</a>`;

  const swtichDiv = document.createElement('div')as HTMLDivElement;
  swtichDiv.classList.add('form-check', 'form-switch');

  const switchInput = document.createElement('input') as HTMLInputElement;
  switchInput.classList.add('form-check-input');
  switchInput.type = "checkbox";
  switchInput.role = "swtich";
  switchInput.checked = s.estudiante_estado.toLowerCase() === "activo" ? true : false;
  swtichDiv.appendChild(switchInput);
  row.insertCell(7).appendChild(swtichDiv);

  const btnUpdate = document.createElement("button");
  btnUpdate.classList.add("btn", "btn-primary", "btn-sm");
  btnUpdate.innerHTML = editIcon;
  row.insertCell(8).appendChild(btnUpdate);

  return row;
};
