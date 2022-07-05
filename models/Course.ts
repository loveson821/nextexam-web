import JSModel from './JSModel';

export default class Curriculum extends JSModel {
  id?: number;
  name?: string;
  related_curriculums?: [Curriculum]

  constructor(json: any) {
    super(json);
    if (this.validate(json)) {

    };
  }

}