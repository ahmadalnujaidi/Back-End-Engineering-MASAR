import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getSum(num1: number, num2: number) {
    const sum = Number(num1) + Number(num2);
    return { total: sum };
  }
}
