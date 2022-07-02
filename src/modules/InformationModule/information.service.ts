import { Injectable } from '@nestjs/common';
import { Information, Prisma } from '@prisma/client';
import { InformationRepository } from 'src/persistance/repository/information.repository';

@Injectable()
export class InformationService {
  constructor(private informationRepository: InformationRepository) {}

  async createInformation(inputInformation: any): Promise<Information> {
    return await this.informationRepository.create(inputInformation);
  }

  async deleteInformation(id: string): Promise<boolean> {
    return await this.informationRepository.delete(id);
  }

  async deleteInformationByProduct(id: string): Promise<boolean> {
    return await this.informationRepository.deleteByProduct(id);
  }
  async deleteInformationByProductAndName(
    id: string,
    name: string,
  ): Promise<boolean> {
    return await this.informationRepository.deleteByProduct(id);
  }

  async getOne(id: string): Promise<Information> {
    return await this.informationRepository.findOne(id);
  }

  async getAll(): Promise<Information[]> {
    return await this.informationRepository.findAll();
  }

  async findByProduct(id: string): Promise<Information[]> {
    return await this.informationRepository.findByProduct(id);
  }

  async updateInformation(
    informationId: string,
    informationForUpdate: any,
    newImage: string,
  ) {
    const information = await this.informationRepository.findOne(informationId);
    informationForUpdate.img_path = newImage;
    return await this.informationRepository.update(
      informationId,
      informationForUpdate,
    );
  }

  async updateInformationWithoutPicture(
    informationId: string,
    informationForUpdate: any,
  ) {
    return await this.informationRepository.update(
      informationId,
      informationForUpdate,
    );
  }
}
