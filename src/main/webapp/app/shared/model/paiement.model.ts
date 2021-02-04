import { Moment } from 'moment';

export interface IPaiement {
  id?: number;
  loyer?: number;
  dateDebut?: Moment;
  duree?: number;
  userId?: number;
  logementId?: number;
}

export class Paiement implements IPaiement {
  constructor(
    public id?: number,
    public loyer?: number,
    public dateDebut?: Moment,
    public duree?: number,
    public userId?: number,
    public logementId?: number
  ) {}
}
