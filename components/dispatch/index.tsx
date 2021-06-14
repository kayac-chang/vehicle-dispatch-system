export * from "./CarSelection";
export * from "./RouteMap";
export * from "./JourneyTable";
export * from "./Journey";

export interface Request {
  date: string;
  time: string;
  case: "options" | "default";
  organizations: string[];
  from: string;
  "from-note-type": string;
  "from-note": string;
  to: string;
  "to-note-type": string;
  "to-note": string;
  share: boolean;
  "is-round-trip": boolean;
  "round-trip-time": string;
  "car-type": string;
  "wheelchair-type": string;
  "accompanying-number": string;
  "sms-code": string;
}
