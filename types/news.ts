export interface News {
  id: string;
  category: string;
  date: string;
  title: string;
  content: string;
}

export enum NewsCategory {
  All = "",
  System = "6741433311767863297",
  // Long Tern Care
  LTC = "6741433439035629569",
}
