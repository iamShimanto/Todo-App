import React from 'react'
import { Link } from 'react-router'

const Error = () => {
  return (
    <div className="h-screen mt-50">
      <Link className="btn" to="/">
        Return Home
      </Link>
    </div>
  );
}

export default Error