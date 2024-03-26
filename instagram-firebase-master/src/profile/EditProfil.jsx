import './Edit.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: '',
    companyName: '',
    position: '',
    workNumber: '',
    mobileNumber: '',
    emailAddress: '',
    workAddress: '',
    currentPassword: '',
    newPassword: '',
    makePublic: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save the form data (e.g., send to server)

    // Redirect to the Profile page after saving
    navigate('/');
  };
  return (
    <div>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
      <div class="container bootstrap snippets bootdeys">
        <div class="row">
          <div class="col-xs-12 col-sm-9">
            <form className="form-horizontal" onSubmit={handleSubmit}>
              <div class="panel panel-default">
                <div class="panel-body text-center">
                  <img src="https://bootdey.com/img/Content/avatar/avatar6.png" class="img-circle profile-avatar" alt="User avatar" />
                </div>
              </div>
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">User info</h4>
                </div>
                <div class="panel-body">
                  <div class="form-group">
                    <label class="col-sm-2 control-label">Location</label>
                    <div class="col-sm-10">
                      <select class="form-control">
                        <option selected="">Select country</option>
                        <option>Uzbekistan</option>
                        <option>Canada</option>
                        <option>Turkiya</option>
                        <option>Russia</option>
                        <option>France</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label">Company name</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label">Position</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="panel panel-default">
                <div class="panel-heading">

                </div>
                <div class="panel-body">
                  <div class="form-group">
                    <label class="col-sm-2 control-label">Work number</label>
                    <div class="col-sm-10">
                      <input type="tel" class="form-control" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label">Mobile number</label>
                    <div class="col-sm-10">
                      <input type="tel" class="form-control" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label">E-mail address</label>
                    <div class="col-sm-10">
                      <input type="email" class="form-control" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label">Work address</label>
                    <div class="col-sm-10">
                      <textarea rows="3" class="form-control"></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">Security</h4>
                </div>
                <div class="panel-body">
                  <div class="form-group">
                    <label class="col-sm-2 control-label">Current password</label>
                    <div class="col-sm-10">
                      <input type="password" class="form-control" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label">New password</label>
                    <div class="col-sm-10">
                      <input type="password" class="form-control" />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                      <div class="checkbox">
                        <input type="checkbox" id="checkbox_1" />
                        <label for="checkbox_1">Make this account public</label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                      <button type="reset" className="btn btn-default">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditProfile
