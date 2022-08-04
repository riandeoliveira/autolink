export interface Page {
  auth: string;
  jobs: string;
}

export interface Input {
  email: string;
  password: string;
  button: string;
}

export interface Scroll {
  min: number;
  current: number;
  max: number;
}

export interface Jobs {
  area: string;
  list: string;
}

export interface Job {
  title: string;
  company: string;
  work_place: string;
}
