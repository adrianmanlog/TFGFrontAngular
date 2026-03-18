import { Component } from '@angular/core';
import { Hero } from "../hero/hero";
import { Services } from "../services/services";
import { Recambios } from "../recambios/recambios";
import { Contact } from "../contact/contact";

@Component({
  selector: 'app-home',
  imports: [Hero, Services, Recambios, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
