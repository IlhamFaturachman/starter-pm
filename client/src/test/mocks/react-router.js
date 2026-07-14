// Lightweight react-router mock for unit tests (plain JS to keep babel happy).
const { createElement } = require('react');

function useNavigate() {
  return () => undefined;
}
function useLocation() {
  return { pathname: '/', search: '', hash: '', state: null, key: 'test' };
}
function useParams() {
  return {};
}
function NavLink(props) {
  const cls = typeof props.className === 'function' ? props.className({ isActive: false }) : props.className;
  return createElement('a', { href: props.to, className: cls }, props.children);
}
function Link(props) {
  return createElement('a', { href: props.to }, props.children);
}
function Outlet() {
  return null;
}
function Navigate() {
  return null;
}
function redirect(to) {
  const err = new Error('Redirect to ' + to);
  err.status = 302;
  throw err;
}
function createBrowserRouter(routes) {
  return { routes };
}
function RouterProvider(props) {
  return props.children;
}

module.exports = {
  useNavigate,
  useLocation,
  useParams,
  NavLink,
  Link,
  Outlet,
  Navigate,
  redirect,
  createBrowserRouter,
  RouterProvider,
};
