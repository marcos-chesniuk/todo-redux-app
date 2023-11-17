import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filtrosValidos, setFiltro } from '../../filtro/filtro.actions';
import { limpiarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.css'
})
export class TodoFooterComponent {

  filtroActual: filtrosValidos = 'todos';
  filtros: filtrosValidos[] = ['todos','completados', 'pendientes'];

  pendientes: number = 0;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.store.select('filtro').subscribe(filtro => {
    //   this.filtroActual = filtro;
    // });

    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length
    })
  }

  cambiarFiltro(filtro: filtrosValidos) {
    this.store.dispatch(setFiltro({filtro}));
  }

  limpiarCompletados() {
    this.store.dispatch(limpiarCompletados())
  }
}
