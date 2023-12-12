import Select from 'react-select';

const Dropdown = ({ options, value, onChange, isDisabled }) => {
  
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isDisabled={isDisabled}
      id='select'
    />
  );
};

export default Dropdown;