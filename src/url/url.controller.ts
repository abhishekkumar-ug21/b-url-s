import { Controller, Post, Body, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  /**
   * Accepts the original URL and returns a short URL
   */
  @Post('shorten')
  async shortenUrl(@Body('originalUrl') originalUrl: string) {
    const result = await this.urlService.shortenUrl(originalUrl);
    
    // Dynamically use the BASE_URL environment variable
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    
    return { shortUrl: `${baseUrl}/url/${result.shortUrl}` };
  }

  /**
   * Redirects to the original URL when visiting the short URL
   */
  @Get(':shortUrl')
  async redirectToOriginal(
    @Param('shortUrl') shortUrl: string,
    @Res() res,
  ) {
    try {
      const originalUrl = await this.urlService.getOriginalUrl(shortUrl);
      return res.redirect(HttpStatus.FOUND, originalUrl);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'URL not found',
      });
    }
  }
}
