
export interface IGrade {
  grade: Number;
  capacity: Number;
  students: Array<IUser>;
}

export interface IInstitute {
  name: Number;
  province: Number;
  grades: Array<IGrade>;
}

export interface IUser {
  name: string;
  email: string;
  dni: string;
  parents: string;
  dniImage: string;
  credits: string;
  healthCertificate: string;
  isForeign: Boolean;
  migratoryPermit: string;
  password: string;
}
