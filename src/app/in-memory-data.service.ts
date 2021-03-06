import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stocks = [
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
    return {stocks};
  }
}