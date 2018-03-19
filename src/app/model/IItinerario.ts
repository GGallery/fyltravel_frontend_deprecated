import {ITravel} from './ITravel';

export class IItinerario {
  constructor(
    public id: number,
    public title: string,
    public author: number,
    public description: string,
    public cover: string,
    public travels: ITravel[],
  ) {   }
}
