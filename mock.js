// https://khhdev.mass.org.tw/api/Users/GetUnPermissionUserType?userId=G122112739&UID=G122112739
// get [id] (isEnable && caseId !== "").caseId
const GetUnPermissionUserType = {
  columnHeaders: [],
  code: 200,
  msg: "加載成功",
  count: 0,
  data: [
    {
      caseId: "6789315035470012416",
      userId: "6789314826878885888",
      caseUserNo: "1",
      userType: "caseuser",
      isEnable: false,
    },
    {
      caseId: "6789568027834228736",
      userId: "6789314826878885888",
      caseUserNo: "2",
      userType: "caseuser",
      isEnable: true,
    },
    {
      caseId: "6789611603716775936",
      userId: "6789314826878885888",
      caseUserNo: "3",
      userType: "caseuser",
      isEnable: false,
    },
    {
      caseId: "",
      userId: "6789314826878885888",
      caseUserNo: "",
      userType: "user",
      isEnable: true,
    },
  ],
};

// https://khhdev.mass.org.tw/api/Users/Get?id=6789314826878885888
// get [id] from GetUnPermissionUserType.caseId
const UsersGet = {
  result: {
    id: "6789314826878885888",
    account: "G122112739",
    name: "阿華",
    uid: "G122112739",
    sex: 1,
    phone: "0987837233",
    status: 1,
    type: 0,
    unLockDate: null,
    createDate: "2021-05-06 18:24:06",
    createUserId: "00000000-0000-0000-0000-000000000000",
    createUserName: "超級管理員",
    modifyDate: "2021-05-06 18:24:06",
    modifyUserId: "",
    modifyUserName: "",
    organizations: "",
    organizationIds: "",
  },
  message: "操作成功",
  code: 200,
};

// https://khhdev.mass.org.tw/api/CaseUsers/Get?id=6789568027834228736
// get [id] from GetUnPermissionUserType.caseId
const CaseUsersGet = {
  result: {
    id: "6789568027834228736",
    userId: "6789314826878885888",
    caseUserId: "6789568027834228736",
    caseUserNo: "2",
    orgAId: "6742474724290895872",
    orgBId1: "6789315307839725568",
    orgBId2: "6792100599483113474",
    orgBId3: "6791937415971381248",
    uid: "G122112739",
    otherPhone: "",
    birthday: "1994-09-12 00:00:00",
    disabilityLevel: 2,
    county: "高雄市",
    district: "苓雅區",
    addr: "武慶三路86號",
    lat: 22.620308,
    lon: 120.331955,
    urgentName: "",
    urgentRelationship: "",
    urgentPhone: "",
    urgentTel: "",
    startDate: "2021-06-05 01:17:42",
    expiredDate: "2099-12-31 00:00:00",
    remark: "",
    caseUserStatus: 1,
    statusReason: null,
    reviewDate: "2021-05-01 00:00:00",
    wealTypeId: "1",
    wealTypeName: "中低收入戶",
    isEffectNow: false,
  },
  message: "操作成功",
  code: 200,
};

// https://khhdev.mass.org.tw/api/CaseUserDiscounts/GetDiscountData?caseuserId=6789568027834228736
// get [caseuserId] from GetUnPermissionUserType.caseId
const GetDiscountData = {
  result: {
    caseUserId: "6789568027834228736",
    useDiscount: 0,
    lastDiscount: 2000,
    totalDiscount: 2000,
  },
  message: "操作成功",
  code: 200,
};

// https://khhdev.mass.org.tw/api/Users/AddMobileVerification?UserAcc=G122112739
// get UserAcc from Users/Get.account
const AddMobileVerification = {
  result: null,
  message: "非司機帳號",
  code: 500,
};
