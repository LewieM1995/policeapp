import { Button, Container, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function DataTable ({currentPage, items, onPageChange, totalPages}) {
    
  
  const pageSize = 1;
  const newRows = 5;
  const startIndex = (currentPage - 1) * pageSize;
  
  
  const arraySplit = (arr, size) => {
    const subarray = [];
    for (let i = 0; i < arr.length; i = i + size) {
      subarray.push(arr.slice(i, i + size));
    }
    return subarray;
  }
  
  const arraySize = 25

  const res = arraySplit(items, arraySize);
  //console.log('Result:', res);

  const currentItem = res.slice(startIndex, startIndex + pageSize);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Street Names:</th>
          </tr>
        </thead>
        <tbody>
        {currentItem.map((item, index) => (
            <tr key={index}>
              <td>{item}</td>
            </tr>
        ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between">
        <Button variant="secondary" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Previous</Button>
        <span> {currentPage}/{totalPages} pages </span>
        <Button variant="secondary" disabled={currentPage * pageSize >= items.length / 25} onClick={() => onPageChange(currentPage + 1)}>Next</Button>
       </div>
    </Container>
  );
}

export default DataTable