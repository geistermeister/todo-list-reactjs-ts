export interface ITodo {
  id: string,
  text: string,
  added: string,
  completed: boolean
}

export interface IFilters {
  hideFinishedTasks: boolean
}