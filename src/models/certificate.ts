export type CertificateStatus = '0' | '1' | '2';
export type ContactStatus = '0' | '1';

export interface Certificate {
    id: string;
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
    signedDate: number;
    yearOfGraduation: number;
  }
  