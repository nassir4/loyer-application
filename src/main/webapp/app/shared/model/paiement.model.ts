import { Moment } from 'moment';
import { Type } from 'app/shared/model/enumerations/type.model';

export interface IPaiement {
  id?: number;
  loyer?: number;
  dateDebut?: Moment;
  duree?: number;
  typePaiement?: Type;
  userId?: number;
  logementId?: number;
}

export class Paiement implements IPaiement {
  constructor(
    public id?: number,
    public loyer?: number,
    public dateDebut?: Moment,
    public duree?: number,
    public typePaiement?: Type,
    public userId?: number,
    public logementId?: number
  ) {}
}
