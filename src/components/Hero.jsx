import "bootstrap/dist/css/bootstrap.min.css";
import "./Hero.scss";

function Hero() {
  return (
    <div className="bg-light text-center py-5 hero">
      <div className="container">
        <h1 className="fw-bold">Find The Best Products In One Place</h1>
        <p className="lead">
          Handpicked affiliate products with real value and trusted reviews.
        </p>
        <a href="#products" className="btn pink-btn btn-lg">
          Explore Products
        </a>
      </div>
    </div>
  );
}

export default Hero;