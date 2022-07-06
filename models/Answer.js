import JSModel from './JSModel';

export default class Answer extends JSModel {
  // id: Int;
  // name: string | undefined;
  // paper_pages: [PaperPage] | undefined;

  constructor(json) {
    super(json);
    if (this.validate(json)) {

    }
    if (this.writing == undefined) {
      this._images = []
    }
    else {
      this._images = this.writing.split(",")
    }
  }

  toParam() {
    console.log("come to answer to param")
    var param = {}
    if (this.id != undefined) {
      param["id"] = this.id
    }
    if (this.writing != undefined) {
      param["writing"] = this.writing
    }
    return param
  }

  images() {
    return this._images
  }

  add_image_data_to_answer(data) {
    this._images.push(data)
    this.writing = this._images.join(",")
  }

  // remove_image_at_index(index){
  //   this._images.splice(index, 1)
  //   var ans_arr = this.writing.split(",")
  //   ans_arr.splice(index, 1)
  //   this.writing = ans_arr.join(",") 
  // }

  set_image_data_to_answer_with_index(data, index) {

    if (index == -1) { // 初始化
      this._images.push(data)
      return
    }

    this._images[index] = data
    this.writing = this._images.join(",")

  }

  remove_image_data_from_writing_with_index(index) {
    this._images.splice(index, 1)
    this.writing = this._images.join(",")
  }

  isText() {
    if (this.writing == undefined) { return false }
    for (var i of this.writing.split(",")) {
      i = i.split("?")[0]
      if (i.endsWith(".jpg") || i.endsWith(".png")) {
        return false
      }
    }
    return true
  }

}