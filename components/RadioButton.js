

export default function RadioButton ( {selectedValue, radioButtonOptions, handleRadioChange}) {
  

  return (
    <div>
      {radioButtonOptions.map((item, index)=> {
        return <label key={index}>
          <input type="radio" value={item.value} checked={selectedValue === item.value} onChange={() => handleRadioChange(item.value)} />
          {item.label}
        </label>
      })}
    </div>
  );
}
