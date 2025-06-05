import { Module } from '@nestjs/common';
import { IniAppController } from './inipage.controller';
import { UseCasesModule } from 'src/use-cases/usecases.module';

@Module({
  imports: [UseCasesModule],
  controllers: [IniAppController],
})
export class IniPageModule {}
