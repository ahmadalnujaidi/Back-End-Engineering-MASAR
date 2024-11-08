import { Body, Controller, Get, Post, Put, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  items = [
    { id: 1, name: 'item1', price: 100 },
    { id: 2, name: 'item2', price: 200 },
    { id: 3, name: 'item3', price: 300 },
  ];

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
  putTestResponse() {
    // or you can remove the "any"
    return { name: 'ahmad', age: 25 };
  }

  // @Post('/find-sum')
  // findSum(@Query('num1') number1, @Query('num2') number2) {
  //   // return { number1, number2 };
  //   // const sum = number1 + number2; // this will concatenate the numbers since they are strings
  //   const sum = Number(number1) + Number(number2); // this will add the numbers
  //   return { total: sum };
  // }

  // using the service
  @Post('/find-sum')
  findSum(@Query('num1') number1, @Query('num2') number2) {
    return this.appService.getSum(number1, number2);
  }

  @Post('/find-difference')
  findDifference(@Query('num1') number1, @Query('num2') number2) {
    const difference = Number(number1) - Number(number2);
    return { 'num1-num2': difference };
  }

  @Post('/find-product')
  findProduct(@Query('num1') number1, @Query('num2') number2) {
    const product = Number(number1) * Number(number2);
    return { 'the numbers multiplied': product };
  }

  @Post('/find-division')
  findDivision(@Query('num1') number1, @Query('num2') number2) {
    const division = Number(number1) / Number(number2);
    return { 'number1 divided by number2': division };
  }

  @Get('/items')
  getItems() {
    // get items from the database
    // return ['item1', 'item2', 'item3'];
    return this.items;
  }

  @Post('/items')
  createItem(@Body('name') name, @Body('price') price) {
    // save item to the database
    // return { name, price };
    const item = { id: this.items.length + 1, name, price };
    this.items.push(item);
    return this.items;
  }

  // get specific item
  @Get('/items/:id')
  getItem(@Param('id') id) {
    return this.items.find((item) => item.id == id);
  }
}
