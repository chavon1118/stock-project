import { Component, OnInit } from '@angular/core';
import { Stock } from '../stock';
import { StockService } from '../stock.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	stocks: Stock[] = [];

	mockStocks = [
    {
      id: 'SHOP',
      symbol: 'SHOP',
      dailyHigh: 197,
      dailyLow: 190,
      dailyOpen: 197,
      dailyClose: 190,
      recentHigh: 197,
      targetHigh: 200,
      targetLow: 170,
      changePercent: 0.05,
      state: 'Hold'
    },
    {
      id: 'DSG',
      symbol: 'DSG',
      dailyHigh: 44,
      dailyLow: 43,
      dailyOpen: 43,
      dailyClose: 44,
      recentHigh: 45,
      targetHigh: 45,
      targetLow: 43,
      changePercent: 0.02,
      state: 'Hold'
    }
    ];

	constructor(private stockService: StockService) { }

	ngOnInit() {
		this.getStocks();
	}

	getStocks(): void {
		this.stockService.getStocks()
		.subscribe(stocks => this.stocks = this.mockStocks);
	}

}
