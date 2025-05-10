import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = process.env.PORT
  await app.listen( PORT , () => {
    console.log(`Server is connected on port ${PORT}`);
  });
}
bootstrap();
