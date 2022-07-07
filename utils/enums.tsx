export enum UsersPaperEditMode {
  user_start_mode,
  user_edit_mode,
  teacher_edit_mode,
  show_only_mode,
  edit_model_answer_mode,
  proof_mode
}

export enum UsersPaperState {
  doing,
  submited,
  correcting,
  done,
  model_answer,
  wait_proofread,
  proofreading
}

export enum PaperPageableType {
  MediaPage = "MediaPage",
  Question = "Question"
}

export enum ExamType {
  Quiz = "quiz",//正常試卷
  Assignment = "assignment",//課前練習試卷
  Practice = "practice"//模擬試試卷
}