
import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { PermissionsSeeder } from '../seeders/permissions.seeder';

@Command({ name: 'auth:seed', description: 'seed auth' })
export class SeedCommand extends CommandRunner {
  private readonly logger = new Logger(SeedCommand.name);

  constructor(
    private readonly permissionSeeder: PermissionsSeeder
  ) {
    super()
  }

  async run(
    inputs: string[],
    options: Record<string, any>
  ): Promise<void> {
    this.logger.log('Seeding started');
    this.logger.log('Seeding permissions');
    await this.permissionSeeder.run();
    this.logger.log('Seeding completed');
  }
}
