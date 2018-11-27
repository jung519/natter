export enum common_code {
  user_class = 'c01',
  user_status = 'c02',
  post_status = 'c03'
}

export enum yes_no {
  yes = 'Y',
  no = 'N'
}

export enum upsert {
  create = 'C',
  modify = 'M'
}

export enum signUpDefaultInfo {
  user_class = 'c01_01', // c01_01: 일반
  user_status = 'c02_01' // c02_01: 사용중
}

export enum post_status {
  write = 'c03_01', // c03_01: 일반
  hide = 'c03_02', // c03_02: 숨김
  report = 'c03_03' // c03_03: 신고
}

export enum user_status {
  in_use = 'c02_01', // 사용중
  secession = 'c02_02', // 탈퇴
  block = 'c02_03' // 차단
}

export enum folderSet {
  img = '/dist/file/img'
}
