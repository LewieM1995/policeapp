import Select from 'react-select';

const Dropdown = ({ options, value, onChange }) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

export default Dropdown;