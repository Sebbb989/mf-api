
export interface IGrade {
  grade: number;
  capacity: number;
  currentlyEnrolled: number;
  students: Array<IUser>;
}

export interface IInstitute {
  name: String;
  province: String;
  minGrade: number;
  maxGrade: number;
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
  isEnrolled: Boolean;
  enrollNumber: string;
}
