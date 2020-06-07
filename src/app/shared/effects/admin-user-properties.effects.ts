import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AdminUserPropertyActions from './../actions/admin-user-properties.action';
import { Property } from '../models/export';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../components/exports';

@Injectable()
export class AdminUserPropertiesEffects {

  constructor(private http: HttpClient, private action$: Actions, private loaderSvc: LoaderService) {
  }

  private apiUrl = environment.apiUrl;

  // -------------------------------------------------------------------------------------------------------------------
  GetUserLocations$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(AdminUserPropertyActions.BeginGetPropertiesOfUserAction),
      mergeMap(action => {
        this.loaderSvc.Open(null, `Loading Properties ...`);
        return this.http.get(this.apiUrl + `/Location/get-agent-locations/${action.userId}`).pipe(
          map((data: Property[]) => {
            console.log(data);
            this.loaderSvc.Close();
            return AdminUserPropertyActions.SuccessGetPropertiesOfUserAction({ payload: data, userId: action.userId });
          }),
          catchError((error: Error) => {
            this.loaderSvc.Close();
            return of(AdminUserPropertyActions.ErrorPropertyOfUserAction(error));
          }));
      })
    )
  );

  // -------------------------------------------------------------------------------------------------------------------
  SaveUserLocation$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(AdminUserPropertyActions.BeginSavePropertyOfUserAction),
      mergeMap(action => {
        this.loaderSvc.Open(null, 'Saving Property');
        return this.http
          .post(this.apiUrl + `/Location/saveProperty/${action.userId}`, JSON.stringify(action.payload), {
            headers: { 'Content-Type': 'application/json' }
          })
          .pipe(
            map((data: Property) => {
              this.loaderSvc.Close();
              return AdminUserPropertyActions.SuccessAddPropertyToUserAction({ payload: data, userId: action.userId });
            }),
            catchError((error: Error) => {
              this.loaderSvc.Close();
              return of(AdminUserPropertyActions.ErrorPropertyOfUserAction(error));
            }));
      })
    )
  );

  // -------------------------------------------------------------------------------------------------------------------
  RemoveUserLocation$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(AdminUserPropertyActions.BeginRemovePropertyOfUserAction),
      mergeMap(action => {
        this.loaderSvc.Open(null, 'Removing Property');
        return this.http
          .post(this.apiUrl + `/Location/delete/${action.userId}/${action.payload.uuid}` , {}, {
            headers: { 'Content-Type': 'application/json' }
          })
          .pipe(
            map((data: Property) => {
              this.loaderSvc.Close();
              return AdminUserPropertyActions.SuccessRemovePropertyOfUserAction({ payload: action.payload, userId: action.userId });
            }),
            catchError((error: Error) => {
              this.loaderSvc.Close();
              return of(AdminUserPropertyActions.ErrorPropertyOfUserAction(error));
            }));
      })
    )
  );
}
