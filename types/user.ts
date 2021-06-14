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
