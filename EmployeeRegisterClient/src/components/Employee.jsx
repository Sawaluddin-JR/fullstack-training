import { useState } from "react";

const defaultImageSrc = "/img/profilpn.png";

const initialFieldsValue = {
  employeeId: 0,
  employeeName: "",
  occupation: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

const Employee = () => {
  const [value, setValues] = useState(initialFieldsValue);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...value,
      [name]: value,
    });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...value,
          imageFile: imageFile,
          imageSrc: x.target.result,
          imageName: imageFile.name,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...value,
        imageFile: null,
        imageSrc: defaultImageSrc,
        imageName: "",
      });
    }
  };

  const validate = () => {
    let temp = {}
    temp.employeeName = value.employeeName == "" ? false : true;
    temp.imageSrc = value.imageSrc == defaultImageSrc ? false : true;
    setError({ ...temp });

    return Object.values(temp).every(x => x===true);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(validate()){
      console.log("submitted");
    }
  };

  return (
    <>
      <div className="container text-center">
        <p className="lead">An Employee</p>
      </div>

      <form
        autoComplete="off"
        noValidate
        className="mb-4"
        onSubmit={handleFormSubmit}
      >
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
                onChange={showPreview}
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

            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">
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
