const input = {
  email: "#username",
  password: "#password",
  button: ".btn__primary--large",
};

const page = {
  auth: "https://www.linkedin.com/login/pt?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin",
  jobs: "https://www.linkedin.com/jobs/collections/recommended/",
};

const job = {
  area: ".jobs-search-results-list",
  list: ".artdeco-entity-lockup__content",
};

module.exports = { input, page, job };
