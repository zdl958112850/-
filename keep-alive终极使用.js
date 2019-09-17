/**
 * 在路由中定义meta标签
 */
{
  path: '/',
  name: 'A',
  component: A,
  meta: {
      keepAlive: true // 需要被缓存
  }
}

/**
 * 在a组件里面
 */

beforeRouteLeave(to, from, next) {
  // 设置下一个路由的 meta
 to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
 next();
}


/**
 * 在b组件里面
 */

beforeRouteLeave(to, from, next) {
  // 设置下一个路由的 meta
  to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
  next();
}

// 可以实现a到b换成, b到a不缓存