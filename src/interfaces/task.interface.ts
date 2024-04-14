interface ITask {
  id: number
  userId: number // chave-estrangeira
  title: string
  status: "to-do" | "completed"
}