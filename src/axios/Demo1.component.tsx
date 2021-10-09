import React, { useEffect, useState } from "react";
import axios, { Cancel } from "axios";

interface Post {
  id: number;
  description: string;
  body: string;
}

export const Demo1Container = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setVisible((v) => !v)}>Toggle Visibility</button>
      {visible && <Demo1 />}
    </div>
  );
};

export const Demo1 = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        cancelToken: cancelTokenSource.token
      })
      .then((r) => setPosts(r.data))
      .catch((e: Cancel | Error) => {
        if (axios.isCancel(e)) {
          console.log(e);
        } else {
          // handle errors
          console.log(e);
        }
      });

    return () => {
      cancelTokenSource.cancel("Operation cancelled by the user!");
    };
  }, []);

  return (
    <div>
      <ul>
        {posts.map((p) => {
          return <li key={p.id}>{p.body}</li>;
        })}
      </ul>
    </div>
  );
};
