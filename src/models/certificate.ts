export type CertificateStatus = '0' | '1' | '2';

export interface Certificate {
    id: string;
    certificateCode: number;
    certificateID: string;
    certificateName: string;
    certificateStatus: CertificateStatus;
    certificateType: string;
    classification: string;
    contactStatus: number;
    ipfsLink: string;
    receivedAddressWallet: string;
    receivedDoB: string;
    receivedName: string;
    signedDate: number;
    yearOfGraduation: number;
  }
  