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
		.subscribe(stock => this.stock = stock);
	}

	goBack(): void {
		this.location.back();
	}

}
