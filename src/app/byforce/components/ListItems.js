export default function ListItems ({ label, value }) {
return (
    <li>
        {label}: {value === null ? "No data given" : value}
    </li>
    );
}

    