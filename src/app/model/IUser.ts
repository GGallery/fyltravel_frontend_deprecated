import {IPosition} from './IPosition';

export class IUser {

  constructor(
    public  id: number,
    public  uid: number,
    public  name: string,
    public  email: string,
    public  natoa: string,
    public  vivea: string,
    public  viveageolocation: string,
    public  password: string,
    public  image: string,
    public  provider: string,
    public  tipologia: string,
    public  descrizione: string,
  ) {  }

}

