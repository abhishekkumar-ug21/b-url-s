import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url, UrlDocument } from './url.schema';
import * as shortid from 'shortid';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  async shortenUrl(originalUrl: string): Promise<Url> {
    const shortUrl = shortid.generate();
    const newUrl = new this.urlModel({ originalUrl, shortUrl });
    return newUrl.save();
  }

  async getOriginalUrl(shortUrl: string): Promise<Url> {
    const url = await this.urlModel.findOne({ shortUrl }).exec();
    if (!url) {
      throw new NotFoundException('Short URL not found');
    }
    return url;
  }
}
