import Curriculum from "./Course";
import Examination from "./Examination";
import Group from "./Group";
import JSModel from "./JSModel";
import moment from 'moment';
import { useServices } from "../pages/services";

/**
 * 模擬考試model
 */
export default class LastMock extends JSModel {
  id?: number;
  title?: string;
  description?: string;
  status!: '' | string;
  source?: string;
  kind?: string;
  purpose?: string;
  premium?: boolean;
  time_used?: string;
  suggest_time_in_hms?: string;

  should_end_at?: string;
  paper_status?: string;
  paper_date?: string;

  can_start_at?: string;
  deadline?: string;

  enrolled?: boolean;
  enrollment_end?: string;
  enrollment_period?: boolean;
  enrollment_start?: string;

  admissions_count?: number;
  score?: string;


  examination?: Examination;
  curriculum?: Curriculum;
  group?: Group;

  users_paper_id?: number;
  users_papers_count?: number;
  total_questions?: string;
  suggest_time?: string;
  max_score?: string;

  constructor(json: any) {
    super(json);
  }


  isNone() {
    return this.status == 'none' || this.status == ''
  }
  isDoing() {
    return this.status == 'doing'
  }
  isSubmited() {
    return this.status == 'submited'
  }
  isCorrecting() {
    return this.status == 'correcting'
  }
  isProofreading() {
    return this.status == 'proofreading'
  }
  isDone() {
    return this.status == 'done'
  }
  /**
   * 
   * @returns 可以報名
   */
  canEnrolled() {
    return !this.enrolled && this.enrollment_period
  }

  /**
   * 過了報名時間，模擬式還沒有開始
   * @returns 
   */
  enrolledNotBeing() {
    return this.enrolled && moment(this.can_start_at).isAfter(moment().format("YYYY-MM-DD HH:mm"))
  }

  /**
   * 模擬考試已結束
   * @returns 
   */
  isFinish() {
    if (this.deadline) {
      return moment(this.deadline).isBefore(moment().format("YYYY-MM-DD HH:mm"))
    }
    return false;
  }

  openTime(t: any) {
    // const { t } = useServices();
    if (this.can_start_at && this.deadline)
      return t.do('mocks.open_time') + moment(this.can_start_at).format('YYYY-MM-DD HH:mm') + " ~ " + moment(this.deadline).format('YYYY-MM-DD HH:mm')
  }

  enrollTime(t: any) {
    // const { t } = useServices();
    if (this.status != 'done' && this.enrollment_start != undefined)
      return t.do('mocks.enrolled_time') + moment(this.enrollment_start).format('YYYY-MM-DD HH:mm') + " ~ " + moment(this.enrollment_end).format('YYYY-MM-DD HH:mm')
  }

  submit_at(t:any) {
    // const { t } = useServices();
    var showText = '';
    switch (this.status) {
      case 'doing':
        showText = t.do('mocks.time_used') + this.time_used
        break;
      case 'submited':
      case 'correcting':
        showText = ''
        break;
      case 'done':
        showText = ''
        break;
      case 'none':
        showText = t.do('mocks.suggest_time_in_hms') + this.suggest_time_in_hms
        break;
      default:
        showText = t.do('mocks.suggest_time_in_hms') + this.suggest_time_in_hms
        break;

    }
    return showText
  }

  getStatus(t: any) {
    // const { t } = useServices();
    var showText = '';
    switch (this.status) {
      case 'doing':
        showText = t.do('exam_status.doing')
        break;
      case 'submited':
      case 'correcting':
        showText = t.do('exam_status.wait_correction')
        break;
      case 'done':
        showText = ''
        break;
      case 'none':
        showText = t.do('exam_status.none')
        break;
      default:
        showText = t.do('exam_status.none')
        break;
    }
    return showText
  }
  getLabel(t: any) {
    // const { t } = useServices();
    var showText = '';
    switch (this.status) {
      case 'doing':
        showText = t.do('exam_status.continue_do')
        break;
      case 'submited':
      case 'correcting':
        showText = t.do('mocks.report')
        break;
      case 'wait_proofread':
      case 'proofread':
        showText = t.do('mocks.report')
        break;
      case 'done':
        showText = t.do('mocks.report')
        break;
      case 'none':
        if (!this.enrolled && this.enrollment_period) {
          showText = t.do('mocks.enrolled')
        } else if (!this.enrolled && !this.enrollment_period) {
          showText =  t.do('mocks.enrollment_period')
        } else {
          showText = t.do('mocks.wait_start')
        }
        break;
      default:
        showText = ''
        break;
    }
    return showText
  }
}