import { useState } from "react";

const defaultImageSrc = "/img/profilpn.png";

const initialFieldsValue = {
  employeeID: 0,
  employeeName: '',
  occupation: '',
  imageName: '',
  imageSrc: defaultImageSrc,
  imageFile: null,
};

const Employee = (props) => {
  // eslint-disable-next-line react/prop-types
  const { addOrEdit } = props;

  const [values, setValues] = useState(initialFieldsValue);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };  

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.employeeName = values.employeeName === "" ? false : true;
    temp.occupation = values.occupation === "" ? false : true;
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === true);
  };

  const resetForm = () => {
    setValues(initialFieldsValue);
    document.getElementById('image-uploader').value = null;
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("employeeID", values.employeeID);
      formData.append("employeeName", values.employeeName);
      formData.append("occupation", values.occupation);
      formData.append("imageName", values.imageName);
      formData.append("imageFile", values.imageFile);

      console.log("Form Data to be sent:");
      for (let pair of formData.entries()) {
         console.log(pair[0] + ': ' + pair[1]);
      }

      addOrEdit(formData,resetForm);
    }
  };

  const applyErrorClass = field => ((field in errors && errors[field] === false) ? 'invalid-field' : '');

  return (
    <>
      <div className="container text-center">
        <p className="lead">An Employee</p>
      </div>

      <form
        autoComplete="off"
        noValidate
        onSubmit={handleFormSubmit}
      >
        <div className="card">
          <img
            src={values.imageSrc}
            className="card-img-top"
          />

          <div className="card-body">
            <div className="form-group">
              <input
                type="file"
                id="image-uploader"
                accept="image/*"
                className={"form-control-file" + applyErrorClass('imageSrc')}
                onChange={showPreview}
              />
            </div>

            <div className="form-group">
              <input
                className={"form-control" + applyErrorClass('employeeName')}
                placeholder="Employee Name"
                name="employeeName"
                value={values.employeeName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Occupation"
                name="occupation"
                value={values.occupation}
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
