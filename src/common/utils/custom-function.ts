export class CustomFunction {
  median = (arr: number[]): number => {
    const mid = Math.floor(arr.length / 2);
    // nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
  };

  average = (arr: number[]): number => {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  };
}
