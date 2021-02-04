export interface IAdresse {
  id?: number;
  region?: string;
  departement?: string;
  commune?: string;
}

export class Adresse implements IAdresse {
  constructor(public id?: number, public region?: string, public departement?: string, public commune?: string) {}
}
