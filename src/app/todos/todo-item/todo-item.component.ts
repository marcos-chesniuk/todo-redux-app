import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { borrar, editar, toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {

  @Input() todo: Todo;
  @ViewChild('inputFisico') txtInputFisico: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl;

  editando = false;
  
  constructor(
    private store: Store<AppState>
  ) {
    
  }

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch(toggle({ id: this.todo.id }));
    })
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;

    if(this.txtInput.valid && this.txtInput.value !== this.todo.texto) {
      this.store.dispatch(
        editar({ id: this.todo.id, texto: this.txtInput.value })
      );
    } else {
      this.txtInput.setValue(this.todo.texto);
    }
  }

  borrar() {
    this.store.dispatch(borrar({ id: this.todo.id }))
  }
}
