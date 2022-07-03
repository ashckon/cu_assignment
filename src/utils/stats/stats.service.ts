import { Injectable } from '@nestjs/common';
import { LogStats } from './stats.model';

@Injectable()
export class StatsService {
  median = (arr: number[]): number => {
    const mid = Math.floor(arr.length / 2);
    // nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
  };

  average = (arr: number[]): number => {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  };

  stats = (arr: number[]): LogStats => {
    const logStats: LogStats = new LogStats();
    logStats.high = arr[arr.length - 1];
    logStats.low = arr[0];
    logStats.median = this.median(arr);
    logStats.average = this.average(arr);

    return logStats;
  };
}
