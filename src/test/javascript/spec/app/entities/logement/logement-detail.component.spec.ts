import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LoyerTestModule } from '../../../test.module';
import { LogementDetailComponent } from 'app/entities/logement/logement-detail.component';
import { Logement } from 'app/shared/model/logement.model';

describe('Component Tests', () => {
  describe('Logement Management Detail Component', () => {
    let comp: LogementDetailComponent;
    let fixture: ComponentFixture<LogementDetailComponent>;
    const route = ({ data: of({ logement: new Logement(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LoyerTestModule],
        declarations: [LogementDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LogementDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LogementDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load logement on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.logement).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
