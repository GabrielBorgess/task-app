import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTarefas();
  }, []);

  const loadTarefas = async () => {
    try {
      const tasksSalvas = await AsyncStorage.getItem('@tasks');
      if (tasksSalvas) {
        setTasks(JSON.parse(tasksSalvas));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const salvarTasks = async (tasksNovas) => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasksNovas));
    } catch (error) {
      console.error(error);
    }
  };

  const adicionarTask = () => {
    const tasksNovas = [...tasks, task];
    setTasks(tasksNovas);
    salvarTasks(tasksNovas);
    setTask('');
  };

  const deletarTask = () => {
    setTasks([]);
    salvarTasks([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>
      <TextInput
        style={styles.input}
        placeholder="Adicione uma tarefa"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.button} onPress={adicionarTask}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDelete} onPress={deletarTask}>
        <Text style={styles.buttonText}>Deletar tasks</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: '20%',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'darkblue',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: 'darkgray',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskItem: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 16,
  },
});

