import {IUser} from './IUser';

export class ITravel {
  constructor(
    public id: number,
    public title: string,
    public author: number,
    public description: string,
    public video: string,
    public hastag: string,
    public cover: string,
    public latitude: string,
    public longitude: string,
    public publish: number,
    public user: IUser,
    public consigliatoa: string,
    public keywords: string,
    public scopo: string,
    public tappe: string,
  ) {   }
}
