import { Injectable, Inject, Optional } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpHeaders }from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Channel } from './channel';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ChannelService {

  private channelsUrl = 'api/channels';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
      this.channelsUrl = `${origin}${this.channelsUrl}`;
    }

  /** GET channels from the server */
  getChannels (): Observable<Channel[]> {
    return this.http.get<Channel[]>(this.channelsUrl)
      .pipe(
        tap(channels => this.log(`fetched channels`)),
        catchError(this.handleError('getchannels', []))
      );
  }

  /** GET channel by id. Return `undefined` when id not found */
  getChannelNo404<Data>(id: number): Observable<Channel> {
    const url = `${this.channelsUrl}/?id=${id}`;
    return this.http.get<Channel[]>(url)
      .pipe(
        map(channels => channels[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} channel id=${id}`);
        }),
        catchError(this.handleError<Channel>(`getChannel id=${id}`))
      );
  }

  /** GET channel by id. Will 404 if id not found */
  getChannel(id: number): Observable<Channel> {
    const url = `${this.channelsUrl}/${id}`;
    return this.http.get<Channel>(url).pipe(
      tap(_ => this.log(`fetched channel id=${id}`)),
      catchError(this.handleError<Channel>(`getChannel id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  getChannelsByCategory(category: string): Observable<Channel[]> {
    if (!category.trim()) {
      // if not search term, return empty channel array.
      return of([]);
    }
    return this.http.get<Channel[]>(`${this.channelsUrl}/?category=${category}`).pipe(
      tap(_ => this.log(`found channels matching "${category}"`)),
      catchError(this.handleError<Channel[]>('searchChannels', []))
    );
  }

  /* GET heroes whose name contains search term */
  getChannelsByGenre(genre: string): Observable<Channel[]> {
    if (!genre.trim()) {
      // if not search term, return empty channel array.
      return of([]);
    }
    return this.http.get<Channel[]>(`${this.channelsUrl}/?genre=${genre}`).pipe(
      tap(_ => this.log(`found channels matching "${genre}"`)),
      catchError(this.handleError<Channel[]>('searchChannels', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ChannelService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ChannelService: ' + message);
  }
}
