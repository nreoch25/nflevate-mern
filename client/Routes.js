import loadable from "loadable-components";

export const Index = loadable(() => import("./components/pages/Index"));
export const Home = loadable(() => import("./components/pages/Home"));
export const Signup = loadable(() => import("./components/pages/Signup"));
export const Admin = loadable(() => import("./components/pages/Admin"));
export const PageNotFound = loadable(() =>
  import("./components/pages/PageNotFound")
);
