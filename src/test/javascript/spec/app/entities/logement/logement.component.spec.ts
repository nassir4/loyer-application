import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LoyerTestModule } from '../../../test.module';
import { LogementComponent } from 'app/entities/logement/logement.component';
import { LogementService } from 'app/entities/logement/logement.service';
import { Logement } from 'app/shared/model/logement.model';

describe('Component Tests', () => {
  describe('Logement Management Component', () => {
    let comp: LogementComponent;
    let fixture: ComponentFixture<LogementComponent>;
    let service: LogementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LoyerTestModule],
        declarations: [LogementComponent],
      })
        .overrideTemplate(LogementComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LogementComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LogementService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Logement(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.logements && comp.logements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
