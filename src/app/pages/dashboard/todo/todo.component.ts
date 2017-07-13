import {Component} from '@angular/core';
import {BaThemeConfigProvider} from '../../../theme';

import {TodoService} from './todo.service';
import {ToastrService} from "ngx-toastr";
import {Todo} from "./todo.model";

@Component({
  selector: 'todo',
  templateUrl: './todo.html',
  styleUrls: ['./todo.scss']
})
export class TodoComponent {

  public dashboardColors = this._baConfig.get().colors.dashboard;

  public todoList:Array<any>;
  public newTodoMessage: string = '';

  constructor(private _baConfig:BaThemeConfigProvider, private _todoService:TodoService, private toastrService: ToastrService) {
    this.todoList = this._todoService.getDummyTodoList();
    this.getRealTodo();
    this.todoList.forEach((item) => {
      item.color = this._getRandomColor();
    });
  }

  getRealTodo(){
    this._todoService.getTodos().subscribe(data => {
      this.todoList = data;
      this.todoList.forEach((item) => {
        item.color = this._getRandomColor();
      });
    }, error => {
        this.toastrService.warning('Error while loading Todos.', 'Oh no.');
    });
  }

  onComplete(e,id){
    this._todoService.setComplete(e.target.checked,id).subscribe(data =>{
      //Will see if I want some implementation here
    }, error => {
      this.toastrService.warning('Error while changing Todo status.', 'Oh no.');
    });
  }

  onDelete(i,todo){
    this._todoService.deleteSingle(todo._id).subscribe(data=>{
      this.todoList.splice(i,1);
    },error=>{
      this.toastrService.warning('Error while deleting Todo.', 'Oh no.');
    });
  }


  addToDoItem(e) {
    if ((e.which === 1 || e.which === 13) ) {
      if (this.newTodoMessage != ''){
        const todo = new Todo(this.newTodoMessage);
        this._todoService.addTodo(todo).subscribe(data=>{
          this.toastrService.success(data.message,'Great');
          data.obj.color = this._getRandomColor();
          this.todoList.push(data.obj);
          this.newTodoMessage = '';
        },error=>{
          this.toastrService.warning('Error while adding Todo.', 'Oh no.');
        });
      }
    }
  }

  private _getRandomColor() {
    let colors = Object.keys(this.dashboardColors).map(key => this.dashboardColors[key]);

    var i = Math.floor(Math.random() * (colors.length - 1));
    return colors[i];
  }
}
