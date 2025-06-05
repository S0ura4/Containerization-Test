import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { IniAppService } from 'src/use-cases/ini/inipage-usecase.service';
@Controller('ini')
export class IniAppController {
  constructor(private readonly appService: IniAppService) {}

  @Get()
  getHello(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html');
    res.send(this.appService.getIniPage());
  }

  @Get('chat')
  getChatPage(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html');
    res.send(this.appService.getChatPage());
  }
}
