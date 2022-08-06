const Pagination = ({ skip, take, page, pageCount, setSkip, setPage }) => {
  return (
    <div className="flex items-center justify-between max-w-md pt-5 pb-10 m-auto">
      <div>
        <button
          className="primary-button disabled:bg-gray-200"
          onClick={() => {
            setSkip(skip - take);
            setPage(page - 1);
          }}
          disabled={skip <= 0}
        >
          Prev-
        </button>
      </div>
      <div>
        {" "}
        {page} out of {pageCount}{" "}
      </div>
      <div>
        <button
          className="primary-button disabled:bg-gray-200"
          disabled={pageCount == page}
          onClick={() => {
            setSkip(skip + take);
            setPage(page + 1);
          }}
        >
          -Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
