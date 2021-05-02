import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default ({ isAuthenticated, token }) => {
  const [user, setUser] = useState("");

  const getData = async () => {
    const bearerToken = "Bearer " + token;
    const res = await axios.get("http://localhost:4000/posts", {
      headers: {
        authorization: bearerToken,
      },
    });

    setUser(res.data.users[0].emailVal);
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>{isAuthenticated ? <h1>{user}</h1> : <Redirect to="/login" />}</div>;
};
