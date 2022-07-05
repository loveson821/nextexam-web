import JSModel from './JSModel';

export default class Vpass extends JSModel {
  // id: Int;
  name?: string;
  invalid_date?: string;
  url?: string;

  constructor(json: any) {
    super(json);
    if (this.validate(json)) {

    };
  }

}