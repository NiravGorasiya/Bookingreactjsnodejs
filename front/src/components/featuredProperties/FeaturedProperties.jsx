import useFetch from "../Hook/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels/all?feature=false&limit=2")
  console.log(data, "data");
  return (
    <div className="fp">
      {
        loading ? "loading" : (
          <>
            {data.map((item) => (
              <div className="fpItem">
                <img
                  src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
                  alt=""
                  className="fpImg"
                />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">{item.cheapestPrice}</span>
                {item.rating && <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
                }
              </div>
            ))}
          </>
        )
      }
    </div >
  );
};

export default FeaturedProperties;
