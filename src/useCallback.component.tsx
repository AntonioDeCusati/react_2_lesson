import React, { useCallback, useState } from "react";

interface ITodo {
  id: number;
  title: string;
}

const UseCallbackComponent = () => {
  console.log("Render Component MemoComponent");
  const [todos, setTodos] = useState<ITodo[]>([
    { id: Date.now(), title: "imparare React" },
    { id: Date.now() + 1, title: "imparare gli state" },
    { id: Date.now() + 2, title: "imparare i componenti funzionali" }
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

  const handleRemove = useCallback(
    (id: number) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  return (
    <div>
      <ListTodos todos={todos} onRemove={handleRemove} />
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
  onRemove: (id: number) => void;
}

const ListTodos: React.VFC<ListTodosProps> = React.memo((props) => {
  console.log("Render Component ListTodos");
  const { todos, onRemove } = props;
  return (
    <ul>
      {todos.map((item, i) => (
        <Todo key={i} todo={item} onRemove={onRemove} />
      ))}
    </ul>
  );
});

interface TodoProps {
  todo: ITodo;
  onRemove: (id: number) => void;
}

const Todo: React.VFC<TodoProps> = React.memo((props) => {
  console.log("Render Component Todo");
  const { todo, onRemove } = props;
  return (
    <li key={todo.id} onClick={() => onRemove(todo.id)}>
      {todo.title}
    </li>
  );
});

export default UseCallbackComponent;
