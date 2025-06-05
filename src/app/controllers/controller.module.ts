import { Module } from '@nestjs/common';
import { IniPageModule } from './ini/inipage.module';

@Module({
  imports: [IniPageModule],
  exports: [IniPageModule],
})
export class ControllerModule {}
