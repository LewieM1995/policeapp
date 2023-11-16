import './pagination.css'

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
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