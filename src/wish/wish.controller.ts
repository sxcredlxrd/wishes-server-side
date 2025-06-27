import { Controller } from '@nestjs/common';
import { WishService } from './wish.service';

@Controller('wish')
export class WishController {
  constructor(private readonly wishService: WishService) {}
}
