import { useState } from "react";

const initialFieldsValue = {
  employeeId: 0,
  employeeName: "",
  occupation: "",
  imageName: "",
  imageSrc: "",
  imageFile: null,
};

const Employee = () => {
  const [value, setValues] = useState(initialFieldsValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...value,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container text-center">
        <p className="lead">An Employee</p>
      </div>

      <form autoComplete="off" noValidate>
        <div className="card">
          <img
            src={value.imageSrc}
            alt={value.imageName}
            className="card-img-top"
          />

          <div className="card-body">
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                className="form-control-file"
                name="imageFile"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Employee Name"
                name="employeeName"
                value={value.employeeName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Occupation"
                name="occupation"
                value={value.occupation}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(value);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Employee;
