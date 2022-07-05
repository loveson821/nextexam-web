import JSModel from './JSModel';

export default class Curriculum extends JSModel {
  id?: number;
  name?: string;

  constructor(json: any) {
    super(json);
    if (this.validate(json)) {

    };
  }

}