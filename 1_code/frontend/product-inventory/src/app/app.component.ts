import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_SETTINGS, appSettings } from './app.settings';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: APP_SETTINGS, useValue: appSettings }],
})
export class AppComponent {
  settings = inject(APP_SETTINGS);
  titleService = inject(Title);


  constructor(){
    this.titleService.setTitle(this.settings.title);
  }
}
