import JSModel from './JSModel';

export default class Question extends JSModel {
  id?: number;
  kind?: string;
  paper_pageable_type?: string;
  // name: string | undefined;
  // paper_pages: [PaperPage] | undefined;

  constructor(json: any) {
    super(json);
    if (this.validate(json)) {

    }
  }

  isMC() {
    return this.kind == 'mc'
  }

}