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
function NavLink({ to, className, children, ...rest }) {
  const cls = typeof className === 'function' ? className({ isActive: false }) : className;
  return createElement('a', { href: to, className: cls, ...rest }, children);
}
function Link({ to, children, ...rest }) {
  return createElement('a', { href: to, ...rest }, children);
}
function Outlet(props) {
  return null;
}
function Navigate(props) {
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
