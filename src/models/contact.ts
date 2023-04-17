export type ContactStatus = 1 | 2;

export interface Contact {
    contactId: string;
    contactCode: number;
    contactName: string;
    createdDate: string;
    contactStatus: ContactStatus;
  }