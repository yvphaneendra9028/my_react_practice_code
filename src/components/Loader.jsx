import { Oval } from "react-loader-spinner";
function Loader() {
  return (
    <div className="loader-container">
      <Oval
        height={50}
        width={50}
        color="#646cff"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#ccc"
        strokeWidth={4}
        strokeWidthSecondary={2}
      />
    </div>
  );
}

export default Loader;