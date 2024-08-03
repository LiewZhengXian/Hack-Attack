import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignOut() {
  return (
    <div className="signin">
      <div className="signin-container">
        <div className="text-center">
          <p>Thanks for using <span className="bold-text">Bee Finance</span></p>
          <p>Forgot anything? <Link to="/" className="dark-link">Go back to sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignOut;
