import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'ricardo', apellido: 'quiroz', corrio: 'ricardoqguzman3@gmail.com',
    pais: 'BO', genero: 'm'
  }
  paises: any[] = [];
  constructor(private paisServices: PaisService) { }
  ngOnInit(): void {
    this.paisServices.getpaises()
      .subscribe(paises => {
        this.paises = paises;
        this.paises.unshift({ nombre: '[seleccione pais]', codigo: ' ' })
      });
  }
  guardar(forma: NgForm) {
    console.log(forma);
    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    console.log(forma.value);
  }
}
