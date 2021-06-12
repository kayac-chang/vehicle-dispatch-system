export interface CaseUserInfo{
  id: string;
    userId: string;
    caseUserId: string;
    caseUserNo: string;
    orgAId: string;
    orgBId1: string;
    orgBId2: string;
    orgBId3: string;
    uid: string;
    otherPhone: string;
    birthday: string;
    disabilityLevel: number;
    county:string;
    district: string;
    addr: string;
    lat:number;
    lon: number;
    urgentName: string;
    urgentRelationship: string;
    urgentPhone:string;
    urgentTel: string;
    startDate: string;
    expiredDate:string;
    remark: string;
    caseUserStatus: number;
    statusReason: string|null;
    reviewDate: string;
    wealTypeId: string;
    wealTypeName: string;
    isEffectNow: boolean;
}

export interface DiscountData {
  caseUserId: string;
  useDiscount: number;
  lastDiscount: number;
  totalDiscount: number;
}