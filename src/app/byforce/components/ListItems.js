const ListItems = ({ label, value }) => {
return (
    <li>
        {label}: {value === null ? "No data given" : value}
    </li>
    );
}

export default ListItems;