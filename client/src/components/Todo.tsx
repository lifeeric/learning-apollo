import * as React from "react";
import { useMutation, gql } from "@apollo/client";

/**
 * GraphQL query
 */
const COMPLETE_TODO = gql`
  mutation CompleteTodo($id: Int!) {
    completeTodo(id: $id) {
      success

      todo {
        id
        text
        completed
      }

      error {
        __typename
        ... on TodoNotFoundError {
          message
        }

        ... on TodoAlreadyCompletedError {
          message
        }
      }
    }
  }
`;

interface Props {
  text: string;
  id: number;
  completed: boolean;
}

export const Todo: React.FC<Props> = ({ id, text, completed }) => {
  const [mutate, { data, error }] = useMutation(COMPLETE_TODO);

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  const changeHandler = (): void => {
    mutate({ variables: { id: id } });
  };

  return (
    <li>
      <input type="checkbox" checked={completed} onChange={changeHandler} />
      <label htmlFor={`todo-${id}`}>Mark</label>
      {text}
      {JSON.stringify(data, null, 2)}
    </li>
  );
};
