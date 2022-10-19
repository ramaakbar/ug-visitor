export type JawabanType<> = {
  jawab1?: string | undefined;
  jawab2?: string | undefined;
  jawab3?: string | undefined;
  jawab4?: string | undefined;
  jawab5?: string | undefined;
};

export interface CertificateRes {
  status: StatusClass;
  certificates: Certificate[];
}

export interface Certificate {
  id: string;
  nama: string;
  id_user: string;
  deskripsi: null;
  date: Date;
  status: StatusEnum;
  no_visitor: string;
}

export enum StatusEnum {
  DoneDownload = 'Done Download',
  Done = 'Done',
  Login = 'login',
  NotPass = 'Not Pass',
}

export interface StatusClass {
  message: string;
  code: number;
}
