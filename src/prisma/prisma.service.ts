import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    await this.user.deleteMany();
    await this.user.createMany({
      data: [
        {
          id: 1,
          name: 'Administrator 1',
          bio: 'I am a administrator.',
          email: 'admin1@email.com',
          username: 'admin1',
          password:
            '5c3a1c57e8bb8e422c0bbefd7ac71bf21d34b1b1eefba0590ea6cc846e2bfb23',
        },
        {
          id: 2,
          name: 'Administrator 2',
          bio: 'I am a administrator.',
          email: 'admin2@email.com',
          username: 'admin2',
          password:
            '5c3a1c57e8bb8e422c0bbefd7ac71bf21d34b1b1eefba0590ea6cc846e2bfb23',
        },
        {
          id: 3,
          name: 'Administrator 3',
          bio: 'I am a administrator.',
          email: 'admin3@email.com',
          username: 'admin3',
          password:
            '5c3a1c57e8bb8e422c0bbefd7ac71bf21d34b1b1eefba0590ea6cc846e2bfb23',
        },
        {
          id: 4,
          name: 'Administrator 4',
          bio: 'I am a administrator.',
          email: 'admin4@email.com',
          username: 'admin4',
          password:
            '5c3a1c57e8bb8e422c0bbefd7ac71bf21d34b1b1eefba0590ea6cc846e2bfb23',
        },
      ],
    });
  }
}
