export interface UnPermissionUserType {
  userId: string;
  caseId: string;
  caseUserNo: string;
  userType: string;
  isEnable: boolean;
}

export interface User {
  id: string;
  account: string;
  name: string;
  uid: string;
  gender: "male" | "female";
  phone: string;
}

export interface Address {
  county: string;
  district: string;
  street: string;
}

export interface Urgent {
  name: string;
  relationship: string;
  phone: string;
  tel: string;
}

export interface CaseUser {
  id: string;
  organizationIDs: string[];
  address: Address;
  urgent: Urgent;
}
