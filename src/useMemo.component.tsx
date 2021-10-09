import React, { useMemo, useState } from "react";

interface ITodo {
  id: number;
  title: string;
}

const UseMemoComponent = () => {
  console.log("Render Component MemoComponent");

  const [todos, setTodos] = useState<ITodo[]>([
    { id: Date.now(), title: "imparare React" },
    { id: Date.now(), title: "imparare gli state" },
    { id: Date.now(), title: "imparare i componenti funzionali" }
  ]);
  const [task, setTask] = useState("");

  const [term, setTerm] = useState("");
  const [search, setSearch] = useState("");

  const onChangeTerm = (e: any) => {
    setTerm(e.target.value);
  };

  const onChangeSearch = (e: any) => {
    setSearch(term);
  };

  const onChangeTask = (e: any) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (task.trim() === "") return;

    setTodos([...todos, { id: Date.now(), title: task }]);
    setTask("");
  };

  const filterTodos = useMemo<ITodo[]>(
    () =>
      todos.filter((todo) => {
        console.log("FILTER FUNCTION called");
        return todo.title.toLowerCase().includes(search.toLowerCase());
      }),
    [search, todos]
  );

  return (
    <div>
      {todos.length}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          placeholder="cerca"
          onChange={onChangeTerm}
        />
        <button type="button" onClick={onChangeSearch}>
          cerca
        </button>
      </form>
      <ListTodos todos={filterTodos} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          placeholder="aggiungi todo"
          onChange={onChangeTask}
        />
      </form>
    </div>
  );
};

interface ListTodosProps {
  todos: ITodo[];
}

const ListTodos: React.VFC<ListTodosProps> = React.memo((props) => {
  console.log("Render Component ListTodos");
  const { todos } = props;
  return (
    <ul>
      {todos.map((item, i) => (
        <Todo key={i} todo={item} />
      ))}
    </ul>
  );
});

interface TodoProps {
  todo: ITodo;
}

const Todo: React.VFC<TodoProps> = React.memo((props) => {
  console.log("Render Component Todo");
  const { todo } = props;
  return <li key={todo.id}>{todo.title}</li>;
});

export default UseMemoComponent;
