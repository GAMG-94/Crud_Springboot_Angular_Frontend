import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/Clientes';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {

  clientes: Cliente[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder, private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]) // Adding email validation
    });
    this.getClientes(); // Fetching clients on component initialization
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get apellido() {
    return this.form.get('apellido');
  }

  get correo() {
    return this.form.get('correo');
  }

  crearCliente() {
    if (this.form.valid) {
      const nombre = this.nombre ? this.nombre.value : '';
      const apellido = this.apellido ? this.apellido.value : '';
      const correo = this.correo ? this.correo.value : '';

      if (nombre && apellido && correo) {
        const cliente: Cliente = {
          nombre_cliente: nombre,
          apellido_cliente: apellido,
          correo_cliente: correo
        };
        this.clientesService.crearCliente(cliente).subscribe(res => {
          this.getClientes();
          this.form.reset();
        });
      }
    }
  }

  getClientes() {
    this.clientesService.getClientes().subscribe(res => {
      this.clientes = res;
    });
  }

  borrarCliente(id_cliente: number) {
    this.clientesService.eliminarCliente(id_cliente).subscribe(res => {
      this.getClientes();
    });
  }
}
