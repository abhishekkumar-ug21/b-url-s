import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url, UrlDocument } from './url.schema';
import * as shortid from 'shortid';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  /**
   * Shortens the original URL and saves it into the database.
   * @param originalUrl The URL to shorten
   */
  async shortenUrl(originalUrl: string): Promise<{ shortUrl: string }> {
    // Check if URL already exists
    const existingUrl = await this.urlModel.findOne({ originalUrl });
    if (existingUrl) {
      return { shortUrl: existingUrl.shortUrl };
    }

    // Generate a unique short URL identifier
    const shortUrl = shortid.generate();

    // Save to database
    const newUrl = new this.urlModel({ originalUrl, shortUrl });
    await newUrl.save();

    return { shortUrl };
  }

  /**
   * Fetch the original URL by short URL
   * @param shortUrl The short URL identifier
   */
  async getOriginalUrl(shortUrl: string): Promise<string> {
    const urlDoc = await this.urlModel.findOne({ shortUrl });
    if (!urlDoc) {
      throw new NotFoundException('Short URL does not exist');
    }

    return urlDoc.originalUrl;
  }
}
