import { useState, useCallback, useEffect } from "react";
import {ITask,TasksService,} from "../../shared/services/api/tasks/TasksService";
import { ApiException } from "../../shared/services/api/ApiException";

export const Dashboard = () => {
  const [list, setList] = useState<ITask[]>([]);

  useEffect(() => {
    TasksService.getAll().then((result) => {
      if (result instanceof ApiException) {
        alert(result.message);
      } else {
        alert('Houve um erro');
      }
    });
  }, []);
  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === "Enter") {
          if (e.currentTarget.value.trim().length === 0) return; //inicia a lista vazia
          const value = e.currentTarget.value;
          e.currentTarget.value = "";

          if (list.some((listItem) => listItem.title === value)) return;
          TasksService.create({ title: value, isCompleted: false }).then(
            (result) => {
              if (result instanceof ApiException) {
                alert(result.message);
              } else {
                setList((oldList) => [...oldList, result]);
              } //else
            }
          ); //then
        } //if e key
      },[list]); //fecha useCallback

  const handleToggleComplete = useCallback((id: number) => {
      const taskToUpdate = list.find((task) => task.id === id); //busca a tarefa q deseja alterar
      if (!taskToUpdate) return;

      TasksService.updateById(id, {
        ...taskToUpdate,
        isCompleted: !taskToUpdate.isCompleted,
      }).then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setList((oldList) => {
            return oldList.map((oldListItem) => {
              if (oldListItem.id === id) return result;
              return oldListItem;
            });
          });
        }
      });
    },
    [list]
  );

  const handleDelete = useCallback((id: number) => {
    TasksService.deleteById(id).then((result) => {
      if (result instanceof ApiException) {
        alert(result.message);
      } else {
        setList((oldList) => {
          return oldList.filter((oldListItem) => oldListItem.id !== id);
        });
      }
    });
  }, []);

  return (
    <div>
      <p>Lista</p>
      <input onKeyDown={handleInputKeyDown} />

      <p>{list.filter((listItem) => listItem.isCompleted).length}</p>

      <ul>
        {list.map((listItem, index) => {
          return (
            <li key={listItem.id}>
              <input
                type="checkbox"
                checked={listItem.isCompleted}
                onChange={() => handleToggleComplete(listItem.id)}
              />

              {listItem.title}

              <button onClick={() => handleDelete(listItem.id)}> Apagar </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
