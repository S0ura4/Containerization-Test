import { Injectable } from '@nestjs/common';
import { getIniPage } from 'src/common/helpers/static/ini-page.server';

@Injectable()
export class IniAppService {
  constructor() {}
  getHello(): string {
    return getIniPage();
  }
}
