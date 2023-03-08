export class Usuario {
  constructor(
    public id: number,
    public personal_id: number,
    public cargos_id: number,
    public departamento_id: number | null,
    public estado: string
  ) {}
}
