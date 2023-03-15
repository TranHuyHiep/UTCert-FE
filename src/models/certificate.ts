export type CertificateStatus = 'completed' | 'pending' | 'failed';

export interface Certificate {
    id: string;
    certificateCode: number;
    certificateID: string;
    certificateName: string;
    certificateStatus: number;
    certificateType: string;
    classification: string;
    contactStatus: number;
    ipfsLink: string;
    receivedAddressWallet: string;
    receivedDoB: string;
    receivedName: string;
    signedDate: Date;
    yearOfGraduation: number;
    status: CertificateStatus;
  }
  