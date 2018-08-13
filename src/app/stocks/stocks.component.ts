import { Component, OnInit } from '@angular/core';
import { Stock } from '../stock';
import { STOCKS } from '../mock-stocks';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
	stocks = STOCKS;
	
  stock: Stock = {
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
  };

  constructor() { }

  ngOnInit() {
  }

}
