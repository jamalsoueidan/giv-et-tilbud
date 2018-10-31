export default [
  { name: "home", path: "/home" },
  {
    name: "incoming",
    path: "/incoming",
    children: [
      {
        name: "send",
        path: "/:id/send"
      }
    ]
  },
  {
    name: "outgoing",
    path: "/outgoing",
    children: [
      {
        name: "info",
        path: "/:id/info"
      }
    ]
  },
  { name: "finished", path: "/finished" },
  {
    name: "login",
    path: "/login",
    layout: "empty",
    auth: false
  }
];
