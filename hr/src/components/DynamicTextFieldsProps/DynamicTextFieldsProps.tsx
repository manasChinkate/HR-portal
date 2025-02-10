import React, { useEffect, useState } from "react";

interface DynamicTextFieldsProps {
  propertyName: string; // The name of the property (e.g., "color")
  onSubmit: (data: { [key: string]: string[] }) => void; // Callback to pass the field data back to parent
}

const DynamicTextFields: React.FC<DynamicTextFieldsProps> = ({ propertyName, onSubmit }) => {
  const [fields, setFields] = useState<string[]>(["", "", "", "", ""]); // Start with 5 empty fields

  // Handle input change for each text field
  const handleInputChange = (index: number, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;

    setFields(updatedFields);

    // Add 5 more fields when typing into the last field
    // if (index === fields.length - 1 && value.trim() !== "") {
    if (updatedFields.every(a => a !== "")) {
      console.log("ADD")
      setFields((prevFields) => [...prevFields, "", "", "", "", ""]);
    }
    // }H
    if (index >= updatedFields.length - 6 && updatedFields.length > 5 && updatedFields.slice(-6).every(a => a == "")) {
      console.log("REMOVE")

      setFields(updatedFields.slice(0, updatedFields.length - 5));
    }
  };
  // useEffect(()=>{

  // },[fields])
  // const a = [1,2,3,4,5,6,7,8,9,10]
  // console.log(a.slice(-5))

  // Handle form submission for this instance


  useEffect(() => {
    const filteredFields = fields.filter((field) => field.trim() !== ""); // Exclude empty fields
    onSubmit({ [propertyName]: filteredFields }); // Pass the data back to parent
  }, [fields])

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md shadow-md">
      <h3 className="text-lg font-semibold capitalize">{propertyName} Fields</h3>
      <div className=" grid grid-cols-5 gap-5">

        {fields.map((field, index) => (
          <input
            key={index}
            type="text"
            value={field}
            placeholder={`Enter ${propertyName} ${index + 1}`}
            // disabled={fields[index - 1] == ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}

      </div>
    </div>
  );
};

export default DynamicTextFields;
