import Image10 from "../assets/images/slideImage1.jpg";
import SliderImage3 from "../assets/images/slideImage3.jpg";
import Banner1 from "../assets/images/Black And White Modern Fashion Sale Banner Landscape.png";
function Slider() {

  return (
    <div className="">
      <div
        id="carouselExampleAutoplaying"
        className="carousel   slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner carousel">
          <div className="carousel-item active   ">
            <img
              src={Banner1}
              className="d-block w-100 "
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img src={Image10} className="d-block w-full object-cover h-full" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={SliderImage3} className="d-block w-full object-cover h-full" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        ></button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        ></button>
      </div>
    </div>
  );
}

export default Slider;
