const Loader = ({ fullScreen = false }) => {
  return (
    <div className={fullScreen ? 'loader-wrap fullscreen' : 'loader-wrap'}>
      <span className="loader" />
    </div>
  );
};

export default Loader;
