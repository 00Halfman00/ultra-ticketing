import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data.errors);
      setErrors(
        <div className="alert alert-danger">
          <ul>
            {err.response.data.errors.map((e) => (
              <li key={e.message}>{e.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  return { errors, doRequest };
};
