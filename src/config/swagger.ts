import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
export const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle('z-record api')
  .setDescription('The z-record API description')
  .setVersion('1.0')
  .addTag('z-record')
  .build();
