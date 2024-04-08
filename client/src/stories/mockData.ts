import { Priority } from "../interfaces/Task";

export const history = [
  {
    id: 70,
    action: "Update due date to '2024-04-17T00:00:00.000Z'",
    user: "username",
    created_at: new Date(),
  },
  {
    id: 69,
    action: "Update priority to 'HIGH'",
    user: "username",
    created_at: new Date(),
  },
  {
    id: 68,
    action: "Update due date to '2024-04-18T00:00:00.000Z'",
    user: "username",
    created_at: new Date(),
  },
  {
    id: 67,
    action: "Rename to '1111'",
    user: "username",
    created_at: new Date(),
  },
  {
    id: 66,
    action: "Update description to '111111'",
    user: "username",
    created_at: new Date(),
  },
  {
    id: 65,
    action: "Update due date to '2024-05-03T00:00:00.000Z'",
    user: "username",
    created_at: new Date(),
  },
  {
    id: 64,
    action: "Rename to '  m m m m '",
    user: "username",
    created_at: new Date(),
  },
];

export const task = {
  id: 1,
  position: 1,
  column: {
    id: 2,
    title: "Task List 1",
    position: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  priority: Priority.LOW,
  taskHistory: [],
  title: "Task Card",
  description: "Task Description",
  due_date: new Date(),
};

export const tasksArray = [
  {
    id: 1,
    position: 1,
    column: {
      id: 1,
      title: "Task List 1",
      position: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    priority: Priority.LOW,
    taskHistory: [],
    title: "Task Card",
    description: "Task Description",
    due_date: new Date(),
  },
  {
    id: 2,
    position: 2,
    column: {
      id: 1,
      title: "Task List 1",
      position: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    priority: Priority.LOW,
    taskHistory: [],
    title: "Task Card",
    description: "Task Description",
    due_date: new Date(),
  },
];

export const columns = [
  {
    id: 1,
    title: "Task List1",
    position: 1,
    board_id: 1,
    task: [],
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    title: "Task List 2",
    position: 2,
    board_id: 2,
    task: [],
    created_at: new Date(),
    updated_at: new Date(),
  },
];
