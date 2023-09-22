import "./App.css";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_USER } from "./query/user";
import { CREATE_USER } from "./mutations/user";

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const {
    data: user,
    loading: userLoading,
    error: userError,
    refetch: userRefetch,
  } = useQuery(GET_USER, {
    variables: {
      id: 1,
    },
  });
  const [createUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);

  console.log(user);

  useEffect(() => {
    !loading && setUsers(data.getAllUsers);
  }, [data]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeAge = (e) => {
    setAge(e.target.value);
  };

  const onCreate = (e) => {
    e.preventDefault();
    createUser({
      variables: {
        input: {
          username,
          age: Number(age),
        },
      },
    }).then(() => {
      refetch().then(() => {
        setUsername("");
        setAge(0);
      });
    });
  };

  const onGet = (e) => {
    e.preventDefault();
    refetch();
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={onChangeUsername}
        />
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={onChangeAge}
        />
        <div>
          <button onClick={onCreate}>Create</button>
          <button onClick={onGet}>Get</button>
        </div>
      </form>
      <div>
        {users.map((user) => (
          <div className="user" key={user.id}>
            {user.id}. {user.username}, {user.age} age
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
