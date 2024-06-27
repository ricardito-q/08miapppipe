import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonEngine } from '@angular/ssr';
import { ValidadoresService } from '../../services/validadores.service';
import { get } from 'http';
import { fail } from 'assert';

@Component({
  selector: 'app-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.css'
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder, private validadores: ValidadoresService) {
    this.crearformulario();
    this.cargardataalformulario();
    this.crearlisteners();
  }
  ngOnInit(): void { }
  get pasatiempos() { return this.forma.get('pasatiempos') as FormArray; }
  get nombrenovalido() { return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched }
  get apellidonovalido() { return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched }
  get correonovalido() { return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched }
  get usuarionovalido() { return this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched }
  get distritonovalido() { return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched }
  get ciudadnovalido() { return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched }
  get pass1novalido() { return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched }


  get pass2novalido() {
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;
    return (pass1 == pass2) ? false : true;
  }
  crearformulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadores.noEjemplo]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      usuario: ['', ,this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([]),
    }, {
      Validators: this.validadores.passwordsIguales('pass1','pass2')
    });
  }
  crearlisteners(){this.forma.get('nombre')?.valueChanges.subscribe(console.log);}
  cargardataalformulario(){
    this.forma.reset({
      nombre: 'ricardo',
      apellido: 'quiroz',
      correo: 'ricardoqguzman3@gmail.com',
      pass1: '12345678',
      pass2: '12345678',
      direccion:{
        distrito: 'distrito 1',
        ciudad: 'santa cruz'
      },
    });
  }
  agregarpasatiempo(){this.pasatiempos.push(this.fb.control(''));}
  borrarpasatiempo(i:number){this.pasatiempos.removeAt(i);}
  guardar(){
    console.log(this.forma);
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAsTouched());
        }else{
          control.markAsTouched();
        }
      });
    }
    //posteo de informacion
    this.forma.reset({
      nombre: 'sin nombre'
    });
  }
}

