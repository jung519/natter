export interface User {
  user_number?: number;
  email?: string;
  password?: string;
  user_name?: string;
  user_status?: string;
  user_class?: string;
  create_date?: Date;
  update_date?: Date;
  introduce?: string;
  sign_fail_cnt?: number;
}

export interface SignAuth {
  email: string;
  password: string;
  user_name?: string;
  signup_email?: string;
  signup_pw?: string;
  signup_pw_1?: string;
  introduce?: string;
  sign_fail_cnt?: number;
  pw_conform?: number;
}
