export class EstadoSolicitud {
  constructor(
    public id: number,
    public solicitudes_id: number,
    public estado: string,
    public observaciones: string,
    public fecha_atualizacion: string
  ) {}
}
