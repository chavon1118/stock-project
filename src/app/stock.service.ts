import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Stock } from './stock';
import { MessageService } from './message.service';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root',
})
export class StockService {
	private stocksUrl = 'api/stocks';
	private stockDataUrl = 'https://www.alphavantage.co';
	private apiKey = 'RWRWMZZF4OBM1Z9Q';

	constructor(
		private http: HttpClient,
		private messageService: MessageService) { }

	getStocks(): Observable<Stock[]> {
		return this.http.get<Stock[]>(this.stocksUrl)
		.pipe(
			tap(stocks => this.log('fetched stocks')),
			catchError(this.handleError('getStocks', []))
			);
	}

	getStockNo404<Data>(symbol: string): Observable<Stock> {
		const url = `${this.stocksUrl}/?symbol=${symbol}`;
		return this.http.get<Stock[]>(url).pipe(
			map(stocks => stocks[0]),
			tap(s => {
				const outcome = s ? `fetched` : `did not find`;
				this.log(`${outcome} stock symbol=${symbol}`);
			}),
			catchError(this.handleError<Stock>(`getStock symbol=${symbol}`))
			);
	}

	getStock(symbol: string): Observable<Stock> {
		const url = `${this.stocksUrl}/${symbol}`;
		const dataUrl = `${this.stockDataUrl}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`;
		return this.http.get<Stock>(dataUrl).pipe(
			tap(_ => this.log(`fetched stock symbol=${symbol}`)),
			catchError(this.handleError<Stock>(`getStock symbol=${symbol}`))
			);
	}

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

	private log(message: string) {
		this.messageService.add(`StockService: ${message}`);
	}
}
