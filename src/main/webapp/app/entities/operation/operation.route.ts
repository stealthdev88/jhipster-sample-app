import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Operation } from 'app/shared/model/operation.model';
import { OperationService } from './operation.service';
import { OperationComponent } from './operation.component';
import { OperationDetailComponent } from './operation-detail.component';
import { OperationUpdateComponent } from './operation-update.component';
import { IOperation } from 'app/shared/model/operation.model';

@Injectable({ providedIn: 'root' })
export class OperationResolve implements Resolve<IOperation> {
  constructor(private service: OperationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOperation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((operation: HttpResponse<Operation>) => operation.body));
    }
    return of(new Operation());
  }
}

export const operationRoute: Routes = [
  {
    path: '',
    component: OperationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.operation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OperationDetailComponent,
    resolve: {
      operation: OperationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.operation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OperationUpdateComponent,
    resolve: {
      operation: OperationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.operation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OperationUpdateComponent,
    resolve: {
      operation: OperationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.operation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
