import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LogementService } from 'app/entities/logement/logement.service';
import { ILogement, Logement } from 'app/shared/model/logement.model';

describe('Service Tests', () => {
  describe('Logement Service', () => {
    let injector: TestBed;
    let service: LogementService;
    let httpMock: HttpTestingController;
    let elemDefault: ILogement;
    let expectedResult: ILogement | ILogement[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(LogementService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Logement(0, 0, 0, 'image/png', 'AAAAAAA', 0, 'AAAAAAA', 0, false, false, false, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Logement', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Logement()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Logement', () => {
        const returnedFromService = Object.assign(
          {
            nbreChambe: 1,
            sufarce: 1,
            photo: 'BBBBBB',
            loyer: 1,
            description: 'BBBBBB',
            etage: 1,
            ascenceur: true,
            garage: true,
            piscine: true,
            grenier: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Logement', () => {
        const returnedFromService = Object.assign(
          {
            nbreChambe: 1,
            sufarce: 1,
            photo: 'BBBBBB',
            loyer: 1,
            description: 'BBBBBB',
            etage: 1,
            ascenceur: true,
            garage: true,
            piscine: true,
            grenier: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Logement', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
