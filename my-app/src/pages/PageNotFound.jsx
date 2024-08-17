import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <h1>Page Not Found</h1>
      <h2>404</h2>
      <br />
      <Link className="link-to-home" to="/">
        Go Home
      </Link>
    </div>
  );
}
