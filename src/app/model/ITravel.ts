import {IUser} from './IUser';

export class ITravel {
  public id: number;
  public title: string;
  public author: number;
  public description: string;
  public shortdescription: string;
  public video: string;
  public hashtag: string;
  public cover: string;
  public position: string;
  public pubblicato: number;
  public consigliatoa: any;
  public keywords: any;
  public scopo: any;
  public rate: number;
  public dal: string;
  public al: string;
  public user?: IUser;

  constructor(values: Object = {}) {
    //Constructor initialization
    Object.assign(this, values);
  }

}

