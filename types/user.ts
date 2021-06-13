
export interface UnPermissionUserType{
  caseId: string;
  userId: string;
  caseUserNo: string;
  userType: string;
  isEnable: boolean;
}

export interface User{
  id: string;
  account: string;
  name: string;
  uid: string;
  gender: "male" | "female";
  phone: string;
}

export interface ChangePasswordRequest{
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

