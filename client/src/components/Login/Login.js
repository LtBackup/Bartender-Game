import React from "react";

const Login = ({ children }) => (
    <div>
        <div class="modal fade" id="newUserModal" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create an Account</h5>
                    </div>
                    <div class="modal-body">
                        <form id="newUserLogin">
                            <div class="form-group">
                                <label for="newUsername">Username</label>
                                <input type="text" class="form-control" id="newUsername" placeholder="Create a username with no spaces." pattern=".{5,}"
                                    required title="5 characters minimum" minlength="5" />
                            </div>
                            <div class="form-group">
                                <label for="newPassword">Password</label>
                                <input type="password" class="form-control" id="newPassword" placeholder="Create a password." pattern=".{5,}" required title="5 characters minimum"
                                    minlength="5" />
                            </div>

                            <div class="error"></div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-success">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="existingUserModal" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Log In to Get Started</h5>
                    </div>
                    <div class="modal-body">
                        <a href="#" data-toggle="modal" data-target="#newUserModal" id="home">
                            New Users: Click Here to Create an Account
                    </a>
                        <br />
                        <br />
                        <form id="existingUserLogin">
                            <div class="form-group">
                                <label for="existingUsername">Username</label>
                                <input type="text" class="form-control" id="existingUsername" placeholder="Enter Your Username" pattern=".{5,}" required />
                            </div>
                            <div class="form-group">
                                <label for="existingPassword">Password</label>
                                <input type="password" class="form-control" id="existingPassword" placeholder="Enter Your Password" pattern=".{5,}" required />
                            </div>
                            <div class="error"></div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-success">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
export default Login;