
const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayPages = 6; // Adjust this number to set the number of pages to display on each side of the current page
  const pageNumbers = [];

  const startPage = Math.max(1, currentPage - Math.floor(displayPages /2));
  const endPage = Math.min(totalPages, currentPage + displayPages -1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <span onClick={() => paginate(Math.max(1, currentPage - 5))} disabled={currentPage === 1}>
        Prev
      </span>
      {pageNumbers.map((number) => (
        <span key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
          {number}
        </span>
      ))}
      <span onClick={() => paginate(Math.min(totalPages, currentPage + 5))} disabled={currentPage === totalPages}>
        Next
      </span>
    </div>
  );
};

export default Pagination;