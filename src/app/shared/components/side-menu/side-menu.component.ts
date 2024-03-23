import { Component } from '@angular/core';
import { IMenu } from '../../interfaces/menu.interface';

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ``
})

export class SideMenuComponent {

  public reactiveMenu: IMenu[] = [
    { title: 'Básico', route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ];

  public AuthMenu: IMenu[] = [
    { title: 'Registro', route: './auth' },
  ];





}
