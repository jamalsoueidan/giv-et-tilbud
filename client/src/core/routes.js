export default [
  { name: "home", path: "/home" },
  {
    name: "profile",
    path: "/profile",
    children: [
      {
        name: "create_shop",
        path: "/shop/create"
      }
    ]
  },
  {
    name: "incoming",
    path: "/incoming?limit&page",
    children: [
      {
        name: "send",
        path: "/:id/send"
      }
    ]
  },
  {
    name: "outgoing",
    path: "/outgoing?limit&page",
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
