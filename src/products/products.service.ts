import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const totalProducts = await this.product.count();
    const lastPage = Math.ceil(totalProducts / limit);

    const products = await this.product.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: products,
      meta: {
        total: totalProducts,
        page: page,
        lastPage: lastPage,
      },
    };
  }

  findOne(id: number) {
    return this.product.findFirst({
      where: { id },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
