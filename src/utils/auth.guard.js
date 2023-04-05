
import store from "../store/index"

export default (to, from, next) => {
  const user = store.getters.currentUser;
  if (to.matched.some((record) => record.meta.loginRequired)) {
    if (user) {
      const roles = to.matched
        .filter((x) => x.meta.roles)
        .map((x) => x.meta.roles);
      if (roles.every((x) => x.includes(user.role))) {
        next();
      } else {
        next("/unauthorized");
      }
    } else {
      next("/user/login");
    }
  } else {
    next();
  }
};
