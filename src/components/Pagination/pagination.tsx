import "./pagination.css";
interface ICustomPaginationProps {
  totalPages: number;
  page: number;
  onChange: (pageNumber: number) => void;
}

export function CustomPagination({
  totalPages,
  page,
  onChange,
}: ICustomPaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="paginationContainer">
      {pageNumbers.map((number) => {
        const buttonColor = number === page ? "primary" : "inherit";
        return (
          <button
            key={number}
            onClick={() => onChange(number)}
            color={buttonColor}
          >
            {number}
          </button>
        );
      })}
    </div>
  );
}
