export type ContactStatus = 1 | 2;

export interface Contact {
  contactID: string;
  contactCode: number;
  contactName: string;
  createdDate: string;
  contactStatus: ContactStatus;
  issuedID: string;
  receivedID: string;
}