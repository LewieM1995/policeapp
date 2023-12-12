

export default function RadioButton ( {selectedValue, radioButtonOptions, handleRadioChange}) {
  
  return (
    <div style={{width:'300px', height: '150px', display: 'flex', alignItems: 'center'}}>
      <ul>
      {radioButtonOptions.map((item, index)=> {
        return (
        <li style={{listStyle: 'none'}} key={index}>
        <label key={index}>
          <input style={{margin: '5px'}} type="radio" value={item.value} checked={selectedValue === item.value} onChange={() => handleRadioChange(item.value)} />
          {item.label}
        </label> 
        </li>
        )
      })}
      </ul>
    </div>
  );
}
