export interface ILogement {
  id?: number;
  nbreChambe?: number;
  sufarce?: number;
  photoContentType?: string;
  photo?: any;
  loyer?: number;
  description?: string;
  etage?: number;
  ascenceur?: boolean;
  garage?: boolean;
  piscine?: boolean;
  grenier?: boolean;
  adresseId?: number;
}

export class Logement implements ILogement {
  constructor(
    public id?: number,
    public nbreChambe?: number,
    public sufarce?: number,
    public photoContentType?: string,
    public photo?: any,
    public loyer?: number,
    public description?: string,
    public etage?: number,
    public ascenceur?: boolean,
    public garage?: boolean,
    public piscine?: boolean,
    public grenier?: boolean,
    public adresseId?: number
  ) {
    this.ascenceur = this.ascenceur || false;
    this.garage = this.garage || false;
    this.piscine = this.piscine || false;
    this.grenier = this.grenier || false;
  }
}
