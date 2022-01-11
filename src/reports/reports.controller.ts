import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dto/createReportDto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guard/authGuard';
import { CurrentUser } from '../users/decorators/currentUser.decorator';
import User from '../users/user.entity';
import { ReportDto } from './dto/reports.dto';
import { Serialize } from 'src/interceptors/serialize.interseptors';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @Serialize(ReportDto)
  createReports(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}
