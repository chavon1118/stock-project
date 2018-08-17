import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Stock } from '../stock';
import { StockService } from '../stock.service';

@Component({
	selector: 'app-stock-detail',
	templateUrl: './stock-detail.component.html',
	styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
	stock: Stock;

	constructor(
		private route: ActivatedRoute,
		private stockService: StockService,
		private location: Location
		) { }

	ngOnInit(): void {
		this.getStock();
	}

	getStock(): void {
		const symbol = this.route.snapshot.paramMap.get('symbol');
		this.stockService.getStock(symbol)
		.subscribe(res => {
			const dailyData = res['Time Series (Daily)'];
			const currentDate = new Date().toISOString().split('T')[0];
			const currentDailyData = dailyData[currentDate];
			const newStock = {
				symbol: 'SHOP',
				dailyHigh: currentDailyData["2. high"],
				dailyLow: currentDailyData["3. low"],
				dailyOpen: currentDailyData["1. open"],
				dailyClose: currentDailyData["4. close"],
				recentHigh: 197,
				targetHigh: 200,
				targetLow: 170,
				changePercent: 0.05,
				state: 'Hold'
			};
			this.stock = newStock;
		});
	}

	goBack(): void {
		this.location.back();
	}

}
