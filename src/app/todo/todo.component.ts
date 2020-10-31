import { Component, OnInit } from '@angular/core';
import {TodoService} from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private TodoService: TodoService) { }

  ngOnInit(): void {
  	this.TodoService.getToDoList()
  	.subscribe(result =>{
      this.toDoListArray = [];
      result.forEach(ele =>{
      	var x = ele.payload.doc.data();
      	x['$key'] = ele.payload.doc.id
      	this.toDoListArray.push(x);
      })
      
      this.toDoListArray.sort((a,b) => {
        return a.isChecked - b.isChecked;
      });
  	});
  }

  onAdd(itemTitle){
  	this.TodoService.addToDoList(itemTitle.value);
  	itemTitle.value = null
  }

  alterCheck(key: string, flag: boolean, title: string){
    this.TodoService.checkOrUncheckedTitle(key, !flag, title)
  }

  deleteItem($key: string){
  	this.TodoService.removeTitle($key);
  }

}
