import { Controller, Get, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // return this.appService.getHello();
    return 'welcome to the MSAR API';
  }

  @Get('/test')
  getTest(): string {
    return 'test2222';
  }

  @Post('/test')
  postTest(): string {
    return 'test';
  }

  @Put('/test-response')
  putTestResponse(): any {
    // or you can remove the "any"
    return { name: 'ahmad', age: 25 };
  }

  @Post('/find-sum')
  findSum(@Query('num1') number1: any, @Query('num2') number2: any): any {
    // return { number1, number2 };
    // const sum = number1 + number2; // this will concatenate the numbers since they are strings
    const sum = Number(number1) + Number(number2); // this will add the numbers
    return { total: sum };
  }

  @Post('/find-difference')
  findDifference(
    @Query('num1') number1: any,
    @Query('num2') number2: any,
  ): any {
    const difference = Number(number1) - Number(number2);
    return { 'num1-num2': difference };
  }

  @Post('/find-product')
  findProduct(@Query('num1') number1: any, @Query('num2') number2: any): any {
    const product = Number(number1) * Number(number2);
    return { 'the numbers multiplied': product };
  }
}
