import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {Todo} from "./todo.model";

@Injectable()
export class TodoService {

  constructor(private http: Http){}

  private _todoList = [
    { message: 'Give us a second while we get your Todos..' }
  ];

  getDummyTodoList() {
    return this._todoList;
  }

  getTodos() {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.get('https://api.deployhandler.com/api/todos' + token)
      .map((response: Response) =>response.json())
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }

  setComplete(complete: string, todoId: string) {
    let body = 'complete='+complete;
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.put('https://api.deployhandler.com/api/todos/' + todoId + token, body, options)
      .map((response: Response) =>response.json())
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  addTodo(todo: Todo){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify(todo);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('https://api.deployhandler.com/api/todos' + token,body,options)
      .map((response: Response) =>response.json())
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }

  deleteSingle(todoId: string){
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.delete('https://api.deployhandler.com/api/todos/' + todoId + token)
      .map((response: Response) =>response.json())
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  wipeTodos(){
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.delete('https://api.deployhandler.com/api/todos' + token)
      .map((response: Response) =>response.json())
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

}
