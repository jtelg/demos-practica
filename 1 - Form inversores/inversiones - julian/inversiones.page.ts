import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonFab, IonSlides, NavController } from '@ionic/angular';
import { ConsultaService } from 'src/app/services/consulta.service';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.page.html',
  styleUrls: ['./inversiones.page.scss'],
})
export class InversionesPage implements OnInit {
  formulario: FormGroup;
  arrimgs = [];
  slideImgsOpts = {
    slidesPerView: 1,
    effect: 'fade',
    autoplay: {
      delay: 30000
    },
    direction: 'horizontal',
    speed: 1000,
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        this.slidelength = slides.length - 1;
        for (let i = 0; i < slides.length; i += 1) {

          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;

          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) { return; }
            if (!swiper || swiper.destroyed) { return; }
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  };
  Objcontacto = {
    interes: '',
    ciudad: '',
    cantdorm: '',
    nombre: '',
    email: '',
    telefono: '',
    descripcion: '',
    mensaje: '',
    to: '',
    pass: '',
    tema: ''
  };
  imghoriz = '';
  imgvert = '';
  bndclass = true;
  fechadehoy = '';
  msg = '';
  @ViewChild(('cont'), { static: true }) content?: IonContent;
  @ViewChild(('ionfab'), { static: true }) fab?: IonFab;
  constructor(
    public servdatos: DatosService,
    public servcons: ConsultaService, private navctrl: NavController,
    private formb: FormBuilder,
    private datepipe: DatePipe
  ) {
    this.formulario = this.formb.group({
      interes: [{ value: '', disabled: false }],
      ciudad: [{ value: '', disabled: false }],
      cantdorm: [{ value: '', disabled: false }],
      nombre: [{ value: '', disabled: false }],
      email: [{ value: '', disabled: false }, [Validators.required]],
      telefono: [{ value: '', disabled: false }],
      descripcion: [{ value: '', disabled: false }]
    });
  }

  ngOnInit() {
    this.imghoriz = 'https://grupofonte.com.ar/servidorAR/Imagenes/inversiones/horiz.jpg';
    this.imgvert = 'https://grupofonte.com.ar/servidorAR/Imagenes/inversiones/vertical.jpg';
    this.fechadehoy = this.datepipe.transform(Date.now(), 'HH:mm');
  }
  scrollTo(elementId: string) {
    if (document.getElementById(elementId) !== null) {
      let y = document.getElementById(elementId).offsetTop;
      y = (y - 130);
      this.content.scrollToPoint(0, y, 2500);
    }
  }
  cityselect(e){
    this.formulario.controls.ciudad.patchValue(e);
    console.log(e);
  }
  stopfab(e) {
    e.stopPropagation();
  }
  enviar() {
    for (const x in this.formulario.value) {
      if (Object.prototype.hasOwnProperty.call(this.formulario.value, x)) {
        this.Objcontacto[x] = this.formulario.value[x];
      }
    }
    this.Objcontacto.to = 'info@grupofonte.com.ar';
    // this.Objcontacto.pass = 'Gfvm5900';
    this.Objcontacto.tema = 'Consulta de inversiones desde el sitio WEB';
    this.Objcontacto.mensaje =
      `Sitio: Grupo Fonte (https://grupofonte.com.ar/inversiones)

El cliente: ${this.Objcontacto.nombre}, Email: ${this.Objcontacto.email} - Telefono: ${this.Objcontacto.telefono}

Esta interesado por ${this.Objcontacto.interes} en la ciudad de ${this.Objcontacto.ciudad}

Mensaje adicional: ${this.Objcontacto.descripcion}
      `;
    this.servcons.enviomsj(this.Objcontacto)
      .subscribe((data: any) => {
        if (data.success) {
          this.navctrl.navigateRoot('/gracias');
        }
      });
  }

}
