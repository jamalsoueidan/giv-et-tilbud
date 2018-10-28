import * as Pages from "../pages";

export default [
  { name: "home", path: "/", component: Pages["Home"] },
  {
    name: "incoming",
    path: "/incoming",
    component: Pages["Incoming"]["Default"]
  },
  {
    name: "incoming.send",
    path: "/:id/send",
    component: Pages["Incoming"]["Send"]
  },
  { name: "outgoing", path: "/outgoing", component: Pages["Outgoing"] },
  { name: "finished", path: "/finished", component: Pages["Finished"] }
];
