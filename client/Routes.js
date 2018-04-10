import loadable from "loadable-components";

export const Index = loadable(() => import("./components/pages/Index"));
export const Home = loadable(() => import("./components/pages/Home"));
export const Signup = loadable(() => import("./components/pages/Signup"));
export const Logout = loadable(() => import("./components/auth/Logout"));
export const Admin = loadable(() => import("./components/pages/Admin"));
export const Group = loadable(() => import("./components/pages/Group"));
export const Profile = loadable(() => import("./components/pages/Profile"));
export const PrivateChat = loadable(() =>
  import("./components/pages/PrivateChat")
);
export const PageNotFound = loadable(() =>
  import("./components/pages/PageNotFound")
);
