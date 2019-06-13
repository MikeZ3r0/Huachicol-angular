export class Denuncia {

  constructor(
    public titulo: string,
    public descripcion: string,
    public sendDate?: Date,
    public punto?: {x: number, y: number, coordinates: [number, number], type: string},
    public email?: string,
    public _id?: string
  ) {}
}
