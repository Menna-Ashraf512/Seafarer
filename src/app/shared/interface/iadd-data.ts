export interface IAddData {
  entity: Entity;
  Qualifications: Qualification[];
  Certificates: Certificate[];
  Languages: Language[];
  References: Reference[];
  WorkExperiences: WorkExperience[];
}

export interface Entity {
  PassPortIssueDate: string;
  IDExPiryDate: string;
  SeamanBookNO: string;
  Remarks: string;
  EmpId: number;
  VisaSponsorId: number;
  VisaIssueDate: string;
  VisaExpiryDate: string;
  NameOfSpouse: string;
  NoOfChildren: number;
  BodyWeight: number;
  Height: number;
  VisaUAEIdNO: string;
  NearestAirport: string;
  ResidenceNumber: string;
  SkypeID: string;
  PermanentAddressHomeCountry: string;
  ContactNumberHomeCountry: string;
  ContactNameAndNumberDuringEmergenciesUAE: string;
  ContactNameAndNumberDuringEmergenciesHome: string;
  SeamanIssueDate: string;
  SeamanExpiryDate: string;
  CicpaNO: string;
  CicpaIssueDate: string;
  CicpaExpiryDate: string;
  Declaration: string;
  SignedOffFromAShipDueToMedicalReason: boolean;
  SignedOffFromAShipDueToMedicalReasonComment: string;
  UndergoneAnyMdicalOperation: any;
  UndergoneAnyMdicalOperationComment: any;
  DoctorConsultation: any;
  DoctorConsultationComment: any;
  HealthOrDisabilityProblem: any;
  HealthOrDisabilityProblemComment: any;
  InquiryOrInvolvedMaritimeAccident: boolean;
  InquiryOrInvolvedMaritimeAccidentComment: string;
  LicenseSuspendedOrRevoked: any;
  LicenseSuspendedOrRevokedComment: any;
}

export interface Qualification {
  DegreeOrCourse: string;
  CourseIssueDate: string;
  ExpiryDate: string;
  MajorOrSubject: string;
  University: string;
  Country: string;
  Type: number;
}

export interface Certificate {
  Capacity: string;
  Regulation: string;
  IssueDate: string;
  ExpiryDate: string;
  IssuingAuthority: string;
  Limitations: string;
  Country: string;
  Type: number;
}

export interface Language {
  Capacity: string;
  Regulation: string;
  IssueDate: string;
  ExpiryDate: string;
  IssuingAuthority: string;
  Limitations: string;
  Country: string;
}

export interface Reference {
  PersonName: string;
  CompanyName: string;
  Country: string;
  Fax: string;
  EmailId: string;
}

export interface WorkExperience {
  VesselName: string;
  VesselType: string;
  Rank: string;
  From: string;
  To: string;
  GRT: string;
  BHP: string;
  CompanyName: string;
}
