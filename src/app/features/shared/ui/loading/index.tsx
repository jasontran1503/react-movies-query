import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className="h-100 d-flex justify-content-center pt-5">
      <ReactLoading type="spin" color="#b2164d" />
    </div>
  );
};

export default Loading;
