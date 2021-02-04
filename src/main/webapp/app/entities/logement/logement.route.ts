import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILogement, Logement } from 'app/shared/model/logement.model';
import { LogementService } from './logement.service';
import { LogementComponent } from './logement.component';
import { LogementDetailComponent } from './logement-detail.component';
import { LogementUpdateComponent } from './logement-update.component';

@Injectable({ providedIn: 'root' })
export class LogementResolve implements Resolve<ILogement> {
  constructor(private service: LogementService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILogement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((logement: HttpResponse<Logement>) => {
          if (logement.body) {
            return of(logement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Logement());
  }
}

export const logementRoute: Routes = [
  {
    path: '',
    component: LogementComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'loyerApp.logement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LogementDetailComponent,
    resolve: {
      logement: LogementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'loyerApp.logement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LogementUpdateComponent,
    resolve: {
      logement: LogementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'loyerApp.logement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LogementUpdateComponent,
    resolve: {
      logement: LogementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'loyerApp.logement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
