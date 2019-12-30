// 路由跳转保护
import { getToken } from "./token";
import router from "../router";

router.beforeEach((to, from, next) => {
  if (getToken()) {
    let user = JSON.parse(localStorage.getItem("_user_"));
    if (user.role == 3) {
      if (determineIfTheRoleExists(to.meta.role, "bureau")) {
        next();
      } else {
        next("/game/home");
      }
    } else {
      if (
        to.name === "LogIn" ||
        determineIfTheRoleExists(to.meta.role, "bureau")
      ) {
        next("/ordinary");
      } else {
        next();
      }
    }
  } else {
    if (
      to.meta &&
      to.meta.role &&
      to.meta.role.length > 0 &&
      to.name !== "LogIn"
    ) {
      next({ path: "/Login", query: { redirect: to.fullPath, type: 1 } });
    } else {
      next();
    }
  }
});

/**
 * 判断角色是否存在
 * @param arr
 * @param val
 * @returns {boolean}
 */
function determineIfTheRoleExists(arr, val) {
  if (arr) {
    return arr.some(item => {
      return item === val;
    });
  }
  return false;
}
