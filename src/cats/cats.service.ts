import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Repository, DataSource, Connection } from "typeorm";
import { Cat } from "./entities/cat.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ulid } from "ulid";

@Injectable()
export class CatsService {
  constructor(
      @InjectRepository(Cat)
      private catRepository: Repository<Cat>,
      private dataSource: DataSource,
      private connection: Connection,
  ){}

  async create(createCatDto: CreateCatDto) {
    return await this.catRepository.save(createCatDto);
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    return await this.catRepository.findOne({where: {id}});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.findOne(id);
    if (!cat) {
      throw new Error('cat not found');
    }
    Object.assign(cat, updateCatDto);
    return await this.catRepository.save(cat);
  }

  async remove(id: number) {
    const cat = await this.findOne(id);
    if (!cat) {
      throw new Error('cat not found');
    }
    return await this.catRepository.remove(cat);
  }

  async updateCatUsingQueryRunner(id: number, updateCatDto: UpdateCatDto) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cat = await this.findOne(id);
      if (!cat) {
        throw new Error('cat not found');
      }
      Object.assign(cat, updateCatDto);

      await queryRunner.manager.save(cat);

      // throw new InternalServerErrorException(); // 일부러 에러를 발생

      await queryRunner.commitTransaction();
    } catch (e) {
      console.log('Roll Backed');
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
