import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {

  forma: FormGroup;

  usuario: object = {
    nombreCompleto:
    {
      nombre: 'Yohanny',
      apellido: 'Vargas'
    },
    correo: 'yohannyvs@gmail.com',
    pasatiempos: [ ]
  };

  constructor() {

    console.log( this.usuario );

    this.forma = new  FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl( '', [
                                        Validators.required,
                                        Validators.minLength( 3 )
                                      ]),
        'apellido': new FormControl( '', [
                                          Validators.required,
                                          this.noIHerrera
                                        ])
      }),
      'correo': new FormControl( '', [
                                      Validators.required,
                                      Validators.pattern( '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$' )
                                    ]),
      'pasatiempos': new FormArray([
                                    new FormControl( '', Validators.required )
                                  ]),
      'username': new FormControl( '', Validators.required, this.existeUusuario ),
      'password1': new FormControl( '', Validators.required ),
      'password2': new FormControl( '' )
    });

    // Segunda forma de setear validators a la forma
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind( this.forma )
    ]);

    // this.forma.setValue( this.usuario );

    this.forma.controls['username'].valueChanges.subscribe( data => {
      console.log( data );
    } );

    this.forma.controls['username'].statusChanges.subscribe( data => {
      console.log( data );
    } );

  }

  agregarPasatiempos() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required )
    );
  }

  noIHerrera( control: FormControl ): { [s: string]: boolean } {
    if ( control.value === 'herrera' ) {
      return { noherrera: true };
    }

    return null;
  }

  noIgual( control: FormControl ): { [s: string]: boolean } {

    const forma: any = this;

    if ( control.value !== forma.controls['password1'].value ) {
      return { noiguales: true };
    }

    return null;
  }

  existeUusuario( control: FormControl ): Promise<any> | Observable<any> {

    const promesa = new Promise(
      ( resolve, reject ) => {
        setTimeout( (  ) => {
          if ( control.value === 'strider' ) {
            resolve( { existe: true } );
          } else {
            resolve( null );
          }
        }, 3000 );
      }
    );

    return promesa;

  }

  guardarCambios() {
    // this.forma.reset({
    //   nombreCompleto:
    //   {
    //     nombre: '',
    //     apellido: ''
    //   },
    //   correo: '',
    //   pasatiempos: [ ]
    // });

    console.log( this.forma.value );
  }

}
