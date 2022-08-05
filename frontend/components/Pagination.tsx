import Link from "./Link";

interface PaginationProps {
  totalPages: string;
  currentPage: string;
}

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const prevPage = parseInt(currentPage) - 1 > 0;
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages);

  return (
    <div className="pt-10 pb-8 space-y-2 md:space-y-5">
      <nav className="flex justify-center space-x-10">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <Link href={`/blog/page/${parseInt(currentPage) - 1}`}>
            <button>Previous</button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/blog/page/${parseInt(currentPage) + 1}`}>
            <button>Next</button>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
