import React, { useState } from 'react'
import DynamicTextFields from './DynamicTextFieldsProps'

const Test = () => {

    const [formData, setFormData] = useState<{ [key: string]: string[] }>({});

  // Handle data submission from each DynamicTextFields instance
  const handleFieldSubmit = (data: { [key: string]: string[] }) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  // Final form submission
  const handleFormSubmit = () => {
    console.log("Form Data:", JSON.stringify(formData,null, 2));
    // You can send the formData to a server or process it as needed
    // alert("Form Submitted: " + JSON.stringify(formData, null, 2));
  };

  return (
<div className="p-8 space-y-6">
      <DynamicTextFields propertyName="color" onSubmit={handleFieldSubmit} />
      <DynamicTextFields propertyName="size" onSubmit={handleFieldSubmit} />
      <DynamicTextFields propertyName="material" onSubmit={handleFieldSubmit} />

      <button
        onClick={handleFormSubmit}
        type="button"
        className="p-3 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Submit All Fields
      </button>
    </div>  )
}

export default Test