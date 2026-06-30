import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-C5RR5G93KG");
};

export const trackPageView = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  });
};