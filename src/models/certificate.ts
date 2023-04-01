export type CertificateStatus = 1 | 2 | 3 | 4;
export type ContactStatus = '1' | '2';

export interface Certificate {
    certificateCode: number;
    certificateID: string;
    certificateName: string;
    certificateStatus: CertificateStatus;
    certificateType: string;
    classification: string;
    contactStatus: ContactStatus;
    ipfsLink: string;
    receivedAddressWallet: string;
    receivedDoB: string;
    receivedName: string;
    signedDate: Date;
    yearOfGraduation: number;
    oganizationName: string;
    modeOfStudy: string;
    receivedDate: string;
  }
  