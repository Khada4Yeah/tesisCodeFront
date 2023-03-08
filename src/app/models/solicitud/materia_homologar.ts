export class MateriasHomologar {
  constructor(
    public solicitudes_id: number,
    public malla_id: number,
    public escuela_id: number,
    public materia_id: number,
    public nombre_materia_procedencia: string,
    public numero_creditos_procedencia: number,
    public anio_aprobacion_materia: number,
    public porcentaje_similiutd_contenidos: number,
    public puntaje_asentar: number,
    public pdf: string,
    public personal_id: number,
    public aprobada: string
  ) {}
}
