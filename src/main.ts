import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { swaggerConfig } from './config/swagger';

async function bootstrap() {
  // app
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局错误拦截
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局返回拦截
  // swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/doc', app, document);
  app.enableCors(); // 开启跨域
  await app.listen(process.env.SERVER_PORT);
  // log
  console.log('------------------------------------');
  console.log('🙌服务运行成功');
  console.log(`🎯端口号：${process.env.SERVER_PORT}`);
  console.log('------------------------------------');
}
bootstrap();
