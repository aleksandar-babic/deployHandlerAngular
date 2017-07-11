export class Todo {
  constructor(public message: string,
              public todoId?: string,
              public userId?: string,
              public isComplete?: string
  ) {}
}
