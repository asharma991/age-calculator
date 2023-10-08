type Map = {
  [key: string]: string;
};

export type FormData = {
  ["day"]: string;
  ["month"]: string;
  ["year"]: string;
};

export type FormErrors = Map & {
  day?: string;
  month?: string;
  year?: string;
  invalidDate?: string;
};
