import './styles.css'


export default function CoordinateInput ({ label1, value1, onChange1, placeholder1, label2, value2, onChange2, placeholder2 }) {

 return (
    <>
    <div className="co-ords-container">
        <label>{label1}:</label>
        <input type="text" step="any" inputMode='decimal' pattern="[0-9.]" value={value1} onChange={onChange1} placeholder={placeholder1} />
        <label>{label2}:</label>
        <input type="text" step="any" inputMode='decimal' pattern="[0-9.]" value={value2} onChange={onChange2} placeholder={placeholder2} />
    </div>
  </>
 )   
};
