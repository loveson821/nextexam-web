import JSModel from './JSModel';

export default class PaperPage extends JSModel {

  id?: number
  key: string = ''
  score?: number
  paper_pageable_id?: number
  paper_pageable_type?: string

  constructor(json: any) {
    super(json);
    if (this.validate(json)) {
      this.key = String(json.id)
    }
  }

  isQuestion() {
    return this.paper_pageable_type == "Question"
  }

  show() {
    console.log("form paper page")
  }
}