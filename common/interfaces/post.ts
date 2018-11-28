import { Pagging } from './paging';

export interface Post extends Pagging {
  post_number?: number;
  user_number?: number;
  content?: string;
  post_status?: string;
  create_date?: Date;
  update_date?: Date;
  del_yn?: string;
  img_number?: number;
  img_url?: string;
  user_name?: string;
  email?: string;
  like_use_yn?: string;
  follow_use_yn?: string;
  sign_in_user_number?: number;
  editFlag?: boolean;
  profile_img?: string;
}

export interface PostLike {
  post_like_number?: number;
  post_number?: number;
  user_number?: number;
  use_yn?: string;
}
