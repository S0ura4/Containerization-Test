import { Injectable } from '@nestjs/common';
import { getChatPage } from 'src/common/helpers/static/chat.server';
import { getIniPage } from 'src/common/helpers/static/ini-page.server';

@Injectable()
export class IniAppService {
  constructor() {}
  getIniPage(): string {
    return getIniPage();
  }
  getChatPage(): string {
    return getChatPage();
  }
}
