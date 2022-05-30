export interface Repository<
  Identifier,
  CreateValue,
  UpdateValue,
  PrismaSchema,
> {
  create(data: CreateValue): Promise<PrismaSchema>;
  update(id: Identifier, data: UpdateValue): Promise<PrismaSchema>;
  delete(id: Identifier): Promise<boolean>;

  findOne(id: Identifier): Promise<PrismaSchema>;
  findAll(): Promise<PrismaSchema[]>;
}
