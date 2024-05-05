import { useState } from 'react';
import { Box, Button, Container, Flex, Input, List, ListItem, Text, VStack } from '@chakra-ui/react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
      setInput('');
    }
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex as="nav" justify="space-between" mb={8}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <VStack spacing={4}>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); handleAddTask(); }} width="100%">
          <Input
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            mr={2}
          />
          <Button onClick={handleAddTask} colorScheme="blue">Add</Button>
        </Flex>
        <List width="100%">
          {tasks.map(task => (
            <ListItem key={task.id} p={2} bg={task.isCompleted ? 'green.100' : 'gray.100'}>
              <Flex justify="space-between" align="center">
                <Text as={task.isCompleted ? 's' : 'span'}>{task.text}</Text>
                <Flex>
                  <Button onClick={() => handleToggleComplete(task.id)} size="sm" mr={2}>
                    <FaCheck />
                  </Button>
                  <Button onClick={() => handleRemoveTask(task.id)} size="sm" colorScheme="red">
                    <FaTrash />
                  </Button>
                </Flex>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;