import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { LogementService } from 'app/entities/logement/logement.service';
import { ILogement, Logement } from 'app/shared/model/logement.model';
import { Piece } from 'app/shared/model/enumerations/piece.model';

describe('Service Tests', () => {
  describe('Logement Service', () => {
    let injector: TestBed;
    let service: LogementService;
    let httpMock: HttpTestingController;
    let elemDefault: ILogement;
    let expectedResult: ILogement | ILogement[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(LogementService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Logement(0, Piece.Maison, 0, 0, 'image/png', 'AAAAAAA', 0, 'AAAAAAA', 0, false, false, false, false, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            createdAt: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Logement', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            createdAt: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdAt: currentDate,
          },
          returnedFromService
        );

        service.create(new Logement()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Logement', () => {
        const returnedFromService = Object.assign(
          {
            typeDePiece: 'BBBBBB',
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
            createdAt: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdAt: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Logement', () => {
        const returnedFromService = Object.assign(
          {
            typeDePiece: 'BBBBBB',
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
            createdAt: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdAt: currentDate,
          },
          returnedFromService
        );

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
