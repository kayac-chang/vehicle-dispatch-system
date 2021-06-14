import { map, prop } from "ramda";
import { get, KHH_API, Token, BaseResponse } from "./base";

interface Organization {
  id: string;
  name: string;
}

interface OrganizationResponse {
  hotKey: string;
  isLeaf: boolean;
  isAutoExpand: boolean;
  iconName: string;
  status: number;
  bizCode: string;
  customCode: string;
  createTime: string;
  createId: number;
  sortNo: number;
  typeName: string;
  typeId: string;
  einno: string;
  chargeName: string;
  chargeTel: string;
  chargePhone: string;
  chargeMail: string;
  noticeMail: boolean;
  cascadeId: string;
  name: string;
  parentId: string;
  parentName: string;
  id: string;
}

function toOrganization(res: OrganizationResponse): Organization {
  return {
    id: res.id,
    name: res.name,
  };
}

interface GetAllOrganizations extends BaseResponse {
  result: OrganizationResponse[];
}

/**
 * [GET /api/Orgs/LoadOrgB]
 *
 * get all organizations from service
 */
export function getAllOrganizations({ token }: Token) {
  return get<GetAllOrganizations>(KHH_API("Orgs/LoadOrgB", {}), {
    "X-Token": token,
  })
    .then(prop("result"))
    .then(map(toOrganization));
}
