import { Controller, Post, Body, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shortenUrl(@Body('originalUrl') originalUrl: string) {
    const result = await this.urlService.shortenUrl(originalUrl);
    return { shortUrl: result.shortUrl };
  }

  @Get(':shortUrl')
  async redirectToOriginal(
    @Param('shortUrl') shortUrl: string,
    @Res() res,
  ) {
    const url = await this.urlService.getOriginalUrl(shortUrl);
    return res.redirect(HttpStatus.FOUND, url.originalUrl);
  }
}
