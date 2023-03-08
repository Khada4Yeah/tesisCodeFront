import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from 'src/app/services/LoginServices/login.service';
import { PdfMateriaSolicitudService } from 'src/app/services/PdfMateriasSolicitudServices/pdfMateriaSolicitud.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { UrlService } from 'src/app/services/UrlServices/url.service';

@Component({
  selector: 'app-crearAnalisisDocente',
  templateUrl: './crearAnalisisDocente.component.html',
  styleUrls: ['./crearAnalisisDocente.component.css'],
})
export class CrearAnalisisDocenteComponent implements OnInit {
  @ViewChild('target') scroll: ElementRef;
  // TOKEN Y DATOS DOCENTE ANALISIS
  public identity: any;
  public token: string;
  public id_solicitud: number;
  public id_materia: number;
  public date: any;

  // VERIFICADORES OBSERVABLES
  public pagina_cargada: boolean;
  public btn_form_loading: boolean;

  // DATOS PARA RELLENAR TABLAS
  public solicitud_detallada: any;
  public materias_solicitud: any;

  // NG-ZORRO
  public validacionFormulario!: FormGroup;

  public opciones_cantidad_creditos: number[];

  constructor(
    private _loginService: LoginService,
    private _pdfMateriaSolicitud: PdfMateriaSolicitudService,
    private _route: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder,
    private alerta: NzMessageService,
    private _urlService: UrlService
  ) {
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();

    this.pagina_cargada = false;

    this.btn_form_loading = false;

    this.opciones_cantidad_creditos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  ngOnInit() {
    this.inicializarValidacionFormulario();
    this.decryptId();
  }

  getIdSolicitud() {
    return this._route.snapshot.paramMap.get('idS') ?? '';
  }

  getIdMateria() {
    return this._route.snapshot.paramMap.get('idM') ?? '';
  }

  getTipo() {
    if (this._route.snapshot.paramMap.get('tipo') === 'cambioCarrera') {
      return 1;
    } else if (
      this._route.snapshot.paramMap.get('tipo') === 'cambioUniversidad'
    ) {
      return 2;
    }
    return 0;
  }

  decryptId() {
    this._urlService.desencriptarParametro(this.getIdSolicitud()).subscribe(
      (id) => {
        if (id !== '') {
          this.id_solicitud = Number(id);
        } else {
          this._router.navigate(['error']);
        }
      },
      (error) => {
        this._router.navigate(['error']);
      },
      () => {}
    );

    this._urlService.desencriptarParametro(this.getIdMateria()).subscribe(
      (id) => {
        if (id !== '') {
          this.id_materia = Number(id);
        } else {
          this._router.navigate(['error']);
        }
      },
      (error) => {
        this._router.navigate(['error']);
      },
      () => {
        this.getDetalleSolicitud();
      }
    );
  }

  getDetalleSolicitud() {
    this._pdfMateriaSolicitud
      .getSolicitudMateria(
        this.token,
        this.identity.sub,
        this.id_solicitud,
        this.id_materia,
        this.getTipo()
      )
      .subscribe(
        (response) => {
          console.log(response);
          if (response.status == 'success') {
            this.solicitud_detallada = response.detalleSolicitud;
            this.materias_solicitud = response.materiasSolicitud;
          }
        },
        (error) => {
          console.log('Error: ', error);
        },
        () => {
          //this.verificarAsignacionesFinalizadas();
          this.cargarDatosFormulario();
          this.pagina_cargada = true;
        }
      );
  }

  guardarDatos() {
    if (this.validacionFormulario.valid) {
      this.btn_form_loading = true;

      let fecha = new Date(
        this.validacionFormulario.value.aprobacionAsignatura
      );

      let anio = fecha.getFullYear();

      let cambios = {
        solicitudes_id: this.id_solicitud,
        materia_id: this.id_materia,
        nombre_materia_procedencia:
          this.validacionFormulario.value.materiaProcedencia,
        numero_creditos_procedencia:
          this.validacionFormulario.value.creditosProcedencia,
        anio_aprobacion_materia: anio,
        porcentaje_similiutd_contenidos:
          this.validacionFormulario.value.porcentajeSimilitud,
        puntaje_asentar: this.validacionFormulario.value.notaAsentar,
        observaciones: this.validacionFormulario.value.conclusionF,
      };

      this._pdfMateriaSolicitud
        .updateAnalisisDocente(this.token, cambios)
        .subscribe(
          (response) => {
            if (response.status === 'success') {
              this.alerta.create('success', 'Registro guardado con éxito.', {
                nzDuration: 2000,
              });
              setTimeout(() => window.location.reload(), 2000);
            } else {
              this.alerta.create('error', 'Registro no guardado.', {
                nzDuration: 2000,
              });
              console.log('response-error', response);
            }
          },
          (error) => {
            this.alerta.create('error', 'Registro no guardado.', {
              nzDuration: 2000,
            });
            console.log('error', error);
            this.btn_form_loading = false;
          },
          () => {
            this.btn_form_loading = false;
          }
        );
    } else {
      Object.values(this.validacionFormulario.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  inicializarValidacionFormulario() {
    this.validacionFormulario = this.fb.group({
      materiaProcedencia: [null, [Validators.required]],
      creditosProcedencia: [
        null,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      aprobacionAsignatura: [null, [Validators.required]],
      porcentajeSimilitud: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      notaAsentar: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      conclusionF: [null, [Validators.required]],
    });
  }

  cargarDatosFormulario() {
    const year = this.materias_solicitud[0].anio_aprobacion_materia;
    const fecha = new Date();
    fecha.setFullYear(year);
    this.validacionFormulario.setValue({
      materiaProcedencia: this.materias_solicitud[0].nombre_materia_procedencia,
      creditosProcedencia:
        this.materias_solicitud[0].numero_creditos_procedencia,
      aprobacionAsignatura:
        this.materias_solicitud[0].anio_aprobacion_materia === null
          ? null
          : new Date(year, 0, 1),
      porcentajeSimilitud:
        this.materias_solicitud[0].porcentaje_similiutd_contenidos,
      notaAsentar: this.materias_solicitud[0].puntaje_asentar,
      conclusionF: this.materias_solicitud[0].observaciones,
    });
  }

  paginaAnterior() {
    const tipo = this._route.snapshot.paramMap.get('tipo');

    if (tipo !== 'cambioCarrera' && tipo !== 'cambioUniversidad') {
      this._router.navigate(['error']);
    }

    this._urlService
      .encriptarParametro(this.id_solicitud.toString())
      .subscribe((id) => {
        this._router.navigate([
          'homologacionDoAnalisis',
          'detalleSolicitud',
          tipo,
          id,
        ]);
      });
  }
}
