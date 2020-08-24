import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { Todo } from "./Todo";

/**
 * GraphQL query
 */

export const TODO_DATA_FRAGMENT = gql`
  fragment TodoItem on Todo {
    __typename
    id
    text
    completed
  }
`;

const TODOS_QUERY = gql`
  {
    visibilityFilter @client

    todos {
      ...TodoItem
    }
  }
  ${TODO_DATA_FRAGMENT}
`;

export const Todos: React.FC = () => {
  const { loading, error, data } = useQuery(TODOS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <pre>{error}</pre>;
  console.log(data);
  return (
    <>
      <p>TODO: display todos</p>
      {data.todos.map((todo: any) => (
        <Todo key={todo.id} {...todo} />
      ))}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};
