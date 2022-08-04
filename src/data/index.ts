import { Input, Jobs, Page } from "../interfaces";

export const input: Input = {
  email: "#username",
  password: "#password",
  button: "btn__primary--large",
};

export const page: Page = {
  auth: "https://www.linkedin.com/login/pt?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin",
  jobs: "https://www.linkedin.com/jobs/search/?currentJobId=3202701658&keywords=Desenvolvedor%20de%20front-end&refresh=true",
};

export const jobs: Jobs = {
  area: ".jobs-search-results-list",
  list: ".artdeco-entity-lockup__content",
};
