// Using the FormRowSelect Component Here
// defaultValue is equal to Empty String ''
// The props that we are going to pass in {name, labelText, list, defaultValue=''}
const FormRowSelect= ({name,labelText,list,defaultValue='', onChange})=>{
    // Using the return statement
    return(
        <div className="form-row">
                        {/* This is the label Component */}
                        <label htmlFor={name} className="form-label">
                        {/* If there is no labelText, you will then have the name here */}
                        {labelText || name}
                        </label>
                        <select name={name} id={name} className="form-select"
                        defaultValue={defaultValue} onChange={onChange}>
                            {/* Object.values Convert it into an Array and using the map method
                            to iterate through the items */}
                            {/* The list is actually the List of the Array Converted
                            from the Object */}
                            {list.map((itemValue)=>{
                            // Provide the Different Available Options using the map method
                            // The key provide the Unique key props to Uniquely Identify the
                            // elements within the list: Each element will have the Unique Key Props
                            // that is assigned to it, this help React to Efficiently Update and
                            // Re-Render the List when the Changes Occur, the key should typically
                            // be the Unique Identifier associated with each item
                            // The value Attribute specified that the value will be submitted when the
                            // form containing the Dropdown is Submitted, when the Particular Option
                            // is Selected, its value will be sent to the Server or Processed by
                            // the Client Side Scripting Elements
                                return <option key={itemValue} value={itemValue}>
                                    {itemValue}
                                </option>
                            })}
                        </select>
        </div>
    );
};

export default FormRowSelect
