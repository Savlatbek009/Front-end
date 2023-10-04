import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="container">
      <center>
        <LazyLoadImage
          style={{ width: `100%`, height: "80vh" }}
          src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000"
          effect="blur"
        />
        <br />
        <br />
        <Link className="btn-yellow" to={"/"}>
          Back Home
        </Link>
      </center>
      <br />
    </section>
  );
}

export default NotFoundPage;
