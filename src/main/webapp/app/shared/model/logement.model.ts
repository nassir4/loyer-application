export interface ILogement {
  id?: number;
  etat?: boolean;
}

export class Logement implements ILogement {
  constructor(public id?: number, public etat?: boolean) {
    this.etat = this.etat || false;
  }
}
