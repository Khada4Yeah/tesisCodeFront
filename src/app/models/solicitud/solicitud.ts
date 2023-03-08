export class Solicitud {
  constructor(
    public id: number,
    public personal_id: number | null,
    public modalidad1_id: number,
    public usuarios_foraneos_id: number | null,
    public universidades_id: number | null,
    public escuelas_origen_id: number | null,
    public malla_origen_id: number | null,
    public escuelas_destino_id: number,
    public tipo: string,
    public pdf: string | null,
    public created_at: string,
    public updated_at: string
  ) {}
}
