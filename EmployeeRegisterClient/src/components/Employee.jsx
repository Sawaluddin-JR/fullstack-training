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

const Employee = (props) => {
  // eslint-disable-next-line react/prop-types
  const { addOrEdit } = props;

  const [value, setValues] = useState(initialFieldsValue);
  const [error, setError] = useState({});

  const handleInputChange = (e) => {
    const { name, value: inputValue } = e.target;
    setValues({
      ...value,
      [name]: inputValue,
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
    let temp = {};
    temp.employeeName = value.employeeName === "" ? false : true;
    temp.imageSrc = value.imageSrc === defaultImageSrc ? false : true;
    setError({ ...temp });

    return Object.values(temp).every((x) => x === true);
  };

  const resetForm = () => {
    setValues(initialFieldsValue);
    document.getElementById('image-upload').value = null;
    setError({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();

      formData.append("employeeId", value.employeeId);
      formData.append("employeeName", value.employeeName);
      formData.append("occupation", value.occupation);
      formData.append("imageFile", value.imageFile);

      addOrEdit(formData,resetForm);
    }
  };

  const applyErrorClass = field => ((field in error && error[field] === false) ? 'invalid-field' : '');

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
                id="image-upload"
                accept="image/*"
                className={"form-control-file" + applyErrorClass('imageSrc')}
                onChange={showPreview}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className={"form-control" + applyErrorClass('employeeName')}
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
