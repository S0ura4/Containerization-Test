import { Module } from '@nestjs/common';
import { IniAppService } from './ini/inipage-usecase.service';

@Module({
  imports: [],
  providers: [IniAppService],
  exports: [IniAppService],
})
export class UseCasesModule {}
