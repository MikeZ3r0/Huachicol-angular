export class Usuario {

  constructor(public nombre: string,
              public userName: string,
              public celular: number,
              public password: string,
              public profiles: [{profileName: string}]) {

  }

}
