import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { Hero } from "./components/hero/hero";
import { Services } from "./components/servicesC/services";
import { Contact } from "./components/contact/contact";
import { Footer } from "./components/footer/footer";
import { Recambios } from "./components/recambios/recambios";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Hero, Services, Contact, Footer, Recambios],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TFGFrontAdrian');
}
