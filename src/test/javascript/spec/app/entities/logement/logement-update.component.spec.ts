import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LoyerTestModule } from '../../../test.module';
import { LogementUpdateComponent } from 'app/entities/logement/logement-update.component';
import { LogementService } from 'app/entities/logement/logement.service';
import { Logement } from 'app/shared/model/logement.model';

describe('Component Tests', () => {
  describe('Logement Management Update Component', () => {
    let comp: LogementUpdateComponent;
    let fixture: ComponentFixture<LogementUpdateComponent>;
    let service: LogementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LoyerTestModule],
        declarations: [LogementUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LogementUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LogementUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LogementService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Logement(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Logement();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
