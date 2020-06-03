import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UserPropertyActions from './../actions/user-properties.action';
import { Property } from '../models/export';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserPropertiesEffects {
  constructor(private http: HttpClient, private action$: Actions) {}

  private apiUrl = environment.apiUrl;

  GetUserLocations$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(UserPropertyActions.BeginGetPropertiesAction),
      mergeMap(action =>
        this.http.get(this.apiUrl + '/Location/get-my-locations').pipe(
          map((data: Property[]) => {
            return UserPropertyActions.SuccessGetPropertiesAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(UserPropertyActions.ErrorPropertyAction(error));
          })
        )
      )
    )
  );


  SaveUserLocation$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(UserPropertyActions.BeginSavePropertyAction),
      mergeMap(action =>
        this.http
          .post(this.apiUrl + '/Location/add', JSON.stringify(action.payload), {
            headers: { 'Content-Type': 'application/json' }
          })
          .pipe(
            map((data: Property) => {
              return UserPropertyActions.SuccessSavePropertyAction({ payload: action.payload });
            }),
            catchError((error: Error) => {
              return of(UserPropertyActions.ErrorPropertyAction(error));
            })
          )
      )
    )
  );

  RemoveUserLocation$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(UserPropertyActions.BeginRemovePropertyAction),
      mergeMap(action =>
        this.http
          .post(this.apiUrl + '/Location/delete/' + action.payload.uuid, {}, {
            headers: { 'Content-Type': 'application/json' }
          })
          .pipe(
            map((data: Property) => {
              return UserPropertyActions.SuccessRemovePropertyAction({ payload: action.payload });
            }),
            catchError((error: Error) => {
              return of(UserPropertyActions.ErrorPropertyAction(error));
            })
          )
      )
    )
  );
}
