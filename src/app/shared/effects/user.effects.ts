import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UsersActions from './../actions/users.actions';
import { User } from '../models/export';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../components/exports';

@Injectable()
export class UserEffects {

  constructor(private http: HttpClient, private action$: Actions, private loaderSvc: LoaderService) {
  }

  private apiUrl = environment.apiUrl;

  // -------------------------------------------------------------------------------------------------------------------
  GetUserLocations$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(UsersActions.BeginGetUserAction),
      mergeMap(action => {
        this.loaderSvc.Open(null, 'Loading Users');
        return this.http.get(this.apiUrl + '/user/get-my-agents').pipe(
          map((data: User[]) => {
            this.loaderSvc.Close();
            return UsersActions.SuccessGetUserAction({ payload: data });
          }),
          catchError((error: Error) => {
            this.loaderSvc.Close();
            return of(UsersActions.ErrorUserAction(error));
          }));
      })
    )
  );

  // -------------------------------------------------------------------------------------------------------------------
  SaveUserLocation$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(UsersActions.BeginSaveUserAction),
      mergeMap(action => {
        this.loaderSvc.Open(null, 'Saving User');
        return this.http
          .post(this.apiUrl + '/Location/save', JSON.stringify(action.payload), {
            headers: { 'Content-Type': 'application/json' }
          })
          .pipe(
            map((data: User) => {
              this.loaderSvc.Close();
              return UsersActions.SuccessSaveUserAction({ payload: data });
            }),
            catchError((error: Error) => {
              this.loaderSvc.Close();
              return of(UsersActions.ErrorUserAction(error));
            }));
      })
    )
  );

  // -------------------------------------------------------------------------------------------------------------------
  RemoveUserLocation$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(UsersActions.BeginRemoveUserAction),
      mergeMap(action => {
        this.loaderSvc.Open(null, 'Removing User');
        return this.http
          .post(this.apiUrl + '/Location/delete/' + action.payload.userId, {}, {
            headers: { 'Content-Type': 'application/json' }
          })
          .pipe(
            map((data: User) => {
              this.loaderSvc.Close();
              return UsersActions.SuccessRemoveUserAction({ payload: action.payload });
            }),
            catchError((error: Error) => {
              this.loaderSvc.Close();
              return of(UsersActions.ErrorUserAction(error));
            }));
      })
    )
  );
}
