import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/User';
import { UrlApi } from './UrlApi';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }
  
  url = 'http://localhost:3000/user'; // api rest fake

  httpOptions ={
    headers : new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  getUser() : Observable<User[]>{
      return this.httpClient.get<User[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getUserById(id: Number) : Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  saveUser(user : User) : Observable<User[]>{
    return this.httpClient.post<User[]>(this.url,JSON.stringify(user),this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  UpdateUser(user : User) : Observable<User[]>{
    return this.httpClient.put<User[]>(`${this.url}/${user.id}`,JSON.stringify(user),this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  deleteUser(user : User) : Observable<User[]>{
    return this.httpClient.delete<User[]>(`${this.url}/${user.id}`)
  }


  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    //console.log(errorMessage);
    return throwError(() => errorMessage);
  }
}
 