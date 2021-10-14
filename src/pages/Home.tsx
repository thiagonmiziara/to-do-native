import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    // Verificando se tem task com mesmo title
    const noRepeatedTasks = tasks.find((task) => task.title === newTaskTitle);
    if (noRepeatedTasks) {
      return Alert.alert(
        "Task já cadastrada!",
        "Você não pode cadastrar uma task com o mesmo nome."
      );
    }
    //TODO - add new task
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const toggleTask = updatedTasks.find((task) => task.id === id);
    if (!toggleTask) return;
    toggleTask.done = !toggleTask.done;

    setTasks(updatedTasks);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const editTask = tasks.map((task) => ({ ...task }));
    const editedTask = editTask.find((task) => task.id === taskId);
    if (!editedTask) return;
    editedTask.title = taskNewTitle;
    setTasks(editTask);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const filteredTasks = tasks.filter((task) => task.id !== id);
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        { text: "Sim", onPress: () => setTasks(filteredTasks) },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272626",
  },
});
