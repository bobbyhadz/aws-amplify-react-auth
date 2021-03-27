import {
  getUniqueTimestamp,
  TodoAttrs,
  TodoPriority,
  TodoStatus,
} from '@shared/index';
import {axiosAuthTodos} from '@utils/axios-instances';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {API_PATHS} from 'src/constants';
import useSWR from 'swr';

export const useFetchTodos = ({
  date,
  statusFilter,
  priorityFilter,
}: {
  date: string;
  statusFilter?: TodoStatus;
  priorityFilter?: TodoPriority;
}) => {
  const path = API_PATHS.FETCH_TODOS({
    date,
    status: statusFilter,
    priority: priorityFilter,
  });

  const {
    data: todos,
    isValidating,
    mutate: mutateTodos,
    revalidate: revalidateTodos,
    error,
  } = useSWR<TodoAttrs[], {message: string; field?: string}[]>(
    path,
    (url: string) => axiosAuthTodos.get<TodoAttrs[]>(url).then(res => res.data),
  );

  return {todos, isValidating, mutateTodos, revalidateTodos, error};
};

export type UseFetchTodosReturnType = ReturnType<typeof useFetchTodos>;

type UseCreateTodoParams = Pick<UseFetchTodosReturnType, 'mutateTodos'> & {
  date: string;
};
type CreateTodoFormInputs = {text: string};

// since I'm using the mutate function from useFetchTodos
// I can only create todos for the key that's already bound to useFetchTodos
// which is the previous da
export const useCreateTodo = ({mutateTodos, date}: UseCreateTodoParams) => {
  const [savingCount, setSavingCount] = useState(0);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    register,
    handleSubmit,
    reset,
    errors: formErrors,
    setValue,
  } = useForm<CreateTodoFormInputs>();

  const onSubmit: SubmitHandler<CreateTodoFormInputs> = async ({text}) => {
    setSavingCount(prev => prev + 1);
    const newTodo = {text, date, createdAt: getUniqueTimestamp()};

    // optimistic UI, because shouldRevalidate is `false`
    // this already placed the todo item in the cache
    await mutateTodos(todosFromCache => {
      return [
        {
          ...newTodo,
          status: TodoStatus.todo,
          priority: TodoPriority.important,
          identityId: 'fake-identity-id',
        },
        ...(todosFromCache ?? []),
      ];
    }, false);

    reset();

    // this places the todo item in the cache once more...
    // here create the todo item for real
    await mutateTodos(async todosFromCache => {
      try {
        const todo = await createTodo(newTodo);
        return todosFromCache?.map(todoFromCache => {
          if (todoFromCache.createdAt === todo.createdAt) {
            return todo;
          }
          return todoFromCache;
        });
      } catch (error) {
        // here fallback state and set the input value again.
        console.log('error is', error);
        setValue('text', text);
        return todosFromCache?.filter(
          todo => todo.createdAt !== newTodo.createdAt,
        );
      }
    }, false);

    setSavingCount(prev => prev - 1);
  };

  return {
    handleCreateTodo: handleSubmit(onSubmit),
    register,
    createTodoFormErrors: formErrors,
    savingCount,
  };
};

async function createTodo({
  text,
  date,
  createdAt,
}: Pick<TodoAttrs, 'text' | 'date' | 'createdAt'>) {
  const res = await axiosAuthTodos.post<TodoAttrs>(API_PATHS.CREATE_TODO(), {
    text,
    date,
    createdAt,
  });

  return res.data;
}

type UseDeleteTodoParams = Pick<UseFetchTodosReturnType, 'mutateTodos'>;

export const useDeleteTodo = ({mutateTodos}: UseDeleteTodoParams) => {
  let todosBeforeOptimisticUpdate: TodoAttrs[] | undefined = [];

  const handleDeleteTodo = async ({
    createdAt,
    date,
  }: Pick<TodoAttrs, 'createdAt' | 'date'>) => {
    // optimistic UI, because shouldRevalidate is set to `false`
    // this already updated the cache
    await mutateTodos(cachedTodos => {
      todosBeforeOptimisticUpdate = cachedTodos;
      return cachedTodos?.filter(todo => todo.createdAt !== createdAt);
    }, false);

    // let err: Error;
    // delete from db for real
    await mutateTodos(async cachedTodos => {
      try {
        await deleteTodo({createdAt, date});
        return cachedTodos;
      } catch (error) {
        console.log('error is', error);
        // err = error as Error;
        return todosBeforeOptimisticUpdate;
      }
      // finally {
      //   if (err) throw err;
      // }
    }, false);
  };
  return {handleDeleteTodo};
};

async function deleteTodo({
  createdAt,
  date,
}: Pick<TodoAttrs, 'createdAt' | 'date'>) {
  const res = await axiosAuthTodos.delete<{message: string}>(
    API_PATHS.DELETE_TODO({createdAt, date}),
  );
  return res.data;
}

type FormInputs = {text: string};

type UseUpdateTodoParams = Pick<
  UseFetchTodosReturnType,
  'todos' | 'mutateTodos'
> &
  Pick<TodoAttrs, 'createdAt' | 'date'> & {setToDefaultMode: () => void};

export type UseUpdateTodoReturnValue = ReturnType<typeof useUpdateTodo>;

export function useUpdateTodo({
  todos,
  mutateTodos,
  createdAt,
  date,
  setToDefaultMode,
}: UseUpdateTodoParams) {
  const todoToUpdate = todos?.find(todo => todo.createdAt === createdAt);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {register, handleSubmit} = useForm<FormInputs>({
    defaultValues: {text: todoToUpdate?.text},
  });

  const [updatedStatus, setUpdatedStatus] = useState<TodoStatus>(
    todoToUpdate?.status || TodoStatus.todo,
  );
  const [updatedPriority, setUpdatedPriority] = useState<TodoPriority>(
    todoToUpdate?.priority || TodoPriority.important,
  );

  const onUpdate: SubmitHandler<FormInputs> = async ({text: updatedText}) => {
    const oldTodo = todos?.find(todo => todo.createdAt === createdAt);

    const updatedProps = {
      text: updatedText,
      status: updatedStatus,
      priority: updatedPriority,
    };

    function getUpdatedTodosCache(
      todosToCache: TodoAttrs[] | undefined,
      newTodoProps: Partial<TodoAttrs>,
    ) {
      return todosToCache?.map(todo => {
        if (todo.createdAt === createdAt) {
          return {...todo, ...newTodoProps};
        }
        return todo;
      });
    }

    // optimistic UI, because shouldRevalidate is set to `false`
    // this already updated the cache
    await mutateTodos(cachedTodos => {
      return getUpdatedTodosCache(cachedTodos, updatedProps);
    }, false);

    setToDefaultMode();

    // update Todo in db for real
    await mutateTodos(async cachedTodos => {
      try {
        await updateTodo({createdAt, date, ...updatedProps});
        return cachedTodos;
      } catch (error) {
        // here I have to rollback to state before update todo
        console.log('error is', error);
        return getUpdatedTodosCache(cachedTodos, oldTodo ?? {});
      }
    }, false);
  };

  return {
    handleUpdateTodo: handleSubmit(onUpdate),
    register,
    setUpdatedStatus,
    setUpdatedPriority,
  };
}

async function updateTodo({
  createdAt,
  date,
  text,
  status,
  priority,
}: Pick<TodoAttrs, 'createdAt' | 'date' | 'text' | 'status' | 'priority'>) {
  const result = await axiosAuthTodos.patch<TodoAttrs>(
    API_PATHS.UPDATE_TODO({createdAt, date}),
    {text, status, priority},
  );

  console.log('result is', result);

  return result.data;
}

type HandlePostponeTodoParams = Pick<TodoAttrs, 'createdAt' | 'date'> & {
  newDate: string;
};

export function usePostponeTodo({
  mutateTodos,
}: Pick<UseFetchTodosReturnType, 'mutateTodos'>) {
  const handlePostponeTodo = async ({
    createdAt,
    date,
    newDate,
  }: HandlePostponeTodoParams) => {
    // it's for a different date
    // i need to use useFetchTodos hook passing in the date
    // or do I need to keep a cache of postponed todos at all
    // I should just update the current state to remove the postponed todos
    let todosBefore: TodoAttrs[] | undefined = [];

    // optimistic UI, because shouldRevalidate is set to false
    // this already updated the cache
    await mutateTodos(cachedTodos => {
      if (date === newDate) return cachedTodos;
      todosBefore = cachedTodos;
      return cachedTodos?.filter(todo => todo.createdAt !== createdAt);
    }, false);

    await mutateTodos(async cachedTodos => {
      try {
        if (date === newDate) return cachedTodos;
        await postponeTodo({createdAt, date, newDate});
        return cachedTodos;
      } catch (error) {
        console.log('error is', error);
        return todosBefore;
      }
    }, false);
  };

  return {handlePostponeTodo};
}

async function postponeTodo({
  createdAt,
  date,
  newDate,
}: HandlePostponeTodoParams) {
  const {data} = await axiosAuthTodos.patch<TodoAttrs>(
    API_PATHS.POSTPONE_TODO({createdAt, date}),
    {newDate},
  );

  return data;
}
