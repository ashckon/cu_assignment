import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import config from './config';
import { UserService } from './user/user.service';

async function bootstrap() {
  const env = config.get('app.env');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn'],
  });

  app.use(helmet());
  app.set('trust proxy', 1);
  app.enableCors();

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: env === 'production',
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  if (env !== 'production') {
    const options = new DocumentBuilder()
      .setTitle(process.env.npm_package_name)
      .setVersion(process.env.npm_package_version)
      .setDescription(process.env.npm_package_description)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/v1/docs', app, document);
  }

  await app.startAllMicroservices();
  await app.listen(config.get('app.port'), config.get('app.host'), () => {
    console.info(
      `Server started on ${config.get('app.host')}:${config.get(
        'app.port',
      )}, env: ${env}`,
      'App',
    );
    console.info(`Connected to db "${config.get('db.name')}"`, 'Database');
  });

  const userService = app.get<UserService>(UserService);
  await userService.createFirstAdminUser();
}
bootstrap();
