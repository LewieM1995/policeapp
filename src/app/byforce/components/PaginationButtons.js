
const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayPages = 9; // Adjust this number to set the number of pages to display on each side of the current page
  const pageNumbers = [];

  const startPage = Math.max(1, currentPage - displayPages);
  const endPage = Math.min(totalPages, currentPage + displayPages);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <span onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </span>
      {pageNumbers.map((number) => (
        <span key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
          {number}
        </span>
      ))}
      <span onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </span>
    </div>
  );
};

export default Pagination;