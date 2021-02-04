import { Moment } from 'moment';
import { Piece } from 'app/shared/model/enumerations/piece.model';

export interface ILogement {
  id?: number;
  typeDePiece?: Piece;
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
  createdAt?: Moment;
  adresseId?: number;
}

export class Logement implements ILogement {
  constructor(
    public id?: number,
    public typeDePiece?: Piece,
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
    public createdAt?: Moment,
    public adresseId?: number
  ) {
    this.ascenceur = this.ascenceur || false;
    this.garage = this.garage || false;
    this.piscine = this.piscine || false;
    this.grenier = this.grenier || false;
  }
}
