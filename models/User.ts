import JSModel from './JSModel';

export default class User extends JSModel {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  grade?: string;
  school?: string;
  school_region?: string;
  career?: string;
  role?: string;
  assignment_notifications_count?: number;
  has_school_section?: boolean;
  promote_user_first_sign_in?: boolean;
  is_promote_user_first_sign_in?: boolean;
  // paper_pages: [PaperPage] | undefined;

  constructor(json:any) {
		super(json);
		if (this.validate(json)) {

		};
	}

}