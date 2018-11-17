export default [
  { name: "home", path: "/home" },
  {
    name: "profile",
    path: "/profile",
    children: [
      {
        name: "account",
        path: "/account"
      },
      {
        name: "workshops",
        path: "/workshops",
        children: [
          {
            name: "create",
            path: "/create"
          }
        ]
      }
    ]
  },
  {
    name: "incoming",
    path: "/incoming?limit&page&device&issue",
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
  {
    name: "finished",
    path: "/finished?limit&page",
    children: [
      {
        name: "info",
        path: "/:id/info"
      }
    ]
  },
  {
    name: "login",
    path: "/login",
    layout: "empty",
    auth: false
  }
];
