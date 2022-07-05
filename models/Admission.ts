import JSModel from './JSModel';

export default class Admission extends JSModel {
    count?: number;
    price?: string;
    android_price?: string;
    url?: string;

  constructor(json: any) {
    super(json);
    if (this.validate(json)) {

    };
  }

}