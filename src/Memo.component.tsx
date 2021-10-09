import React, { useState } from "react";

interface ITodo {
  id: number;
  title: string;
}

const MemoComponent = () => {
  console.log("Render Component MemoComponent");
  const [todos, setTodos] = useState<ITodo[]>([
    { id: Date.now(), title: "imparare React" },
    { id: Date.now(), title: "imparare gli state" },
    { id: Date.now(), title: "imparare i componenti funzionali" }
  ]);
  const [task, setTask] = useState("");

  const onChangeTask = (e: any) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (task.trim() === "") return;

    setTodos([...todos, { id: Date.now(), title: task }]);
    setTask("");
  };

  return (
    <div>
      <ListTodos todos={todos} />
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

export default MemoComponent;
