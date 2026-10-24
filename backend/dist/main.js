import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('Bootstrap');
    // Enable CORS for frontend client
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://127.0.0.1:3000'
        ],
        credentials: true
    });
    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true
        }
    }));
    const port = process.env.PORT || 4000;
    await app.listen(port);
    logger.log(`🚀 FoodRescue GraphQL Backend running at http://localhost:${port}/graphql`);
}
bootstrap();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5lc3RGYWN0b3J5IH0gZnJvbSAnQG5lc3Rqcy9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvblBpcGUsIExvZ2dlciB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSAnLi9hcHAubW9kdWxlLmpzJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGJvb3RzdHJhcCgpIHtcclxuICBjb25zdCBhcHAgPSBhd2FpdCBOZXN0RmFjdG9yeS5jcmVhdGUoQXBwTW9kdWxlKTtcclxuICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCdCb290c3RyYXAnKTtcclxuXHJcbiAgLy8gRW5hYmxlIENPUlMgZm9yIGZyb250ZW5kIGNsaWVudFxyXG4gIGFwcC5lbmFibGVDb3JzKHtcclxuICAgIG9yaWdpbjogWydodHRwOi8vbG9jYWxob3N0OjMwMDAnLCAnaHR0cDovLzEyNy4wLjAuMTozMDAwJ10sXHJcbiAgICBjcmVkZW50aWFsczogdHJ1ZSxcclxuICB9KTtcclxuXHJcbiAgLy8gR2xvYmFsIHZhbGlkYXRpb24gcGlwZVxyXG4gIGFwcC51c2VHbG9iYWxQaXBlcyhcclxuICAgIG5ldyBWYWxpZGF0aW9uUGlwZSh7XHJcbiAgICAgIHdoaXRlbGlzdDogdHJ1ZSxcclxuICAgICAgdHJhbnNmb3JtOiB0cnVlLFxyXG4gICAgICBmb3JiaWROb25XaGl0ZWxpc3RlZDogdHJ1ZSxcclxuICAgICAgdHJhbnNmb3JtT3B0aW9uczogeyBlbmFibGVJbXBsaWNpdENvbnZlcnNpb246IHRydWUgfSxcclxuICAgIH0pLFxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDQwMDA7XHJcbiAgYXdhaXQgYXBwLmxpc3Rlbihwb3J0KTtcclxuICBsb2dnZXIubG9nKGDwn5qAIEZvb2RSZXNjdWUgR3JhcGhRTCBCYWNrZW5kIHJ1bm5pbmcgYXQgaHR0cDovL2xvY2FsaG9zdDoke3BvcnR9L2dyYXBocWxgKTtcclxufVxyXG5cclxuYm9vdHN0cmFwKCk7XHJcbiJdLCJuYW1lcyI6WyJOZXN0RmFjdG9yeSIsIlZhbGlkYXRpb25QaXBlIiwiTG9nZ2VyIiwiQXBwTW9kdWxlIiwiYm9vdHN0cmFwIiwiYXBwIiwiY3JlYXRlIiwibG9nZ2VyIiwiZW5hYmxlQ29ycyIsIm9yaWdpbiIsImNyZWRlbnRpYWxzIiwidXNlR2xvYmFsUGlwZXMiLCJ3aGl0ZWxpc3QiLCJ0cmFuc2Zvcm0iLCJmb3JiaWROb25XaGl0ZWxpc3RlZCIsInRyYW5zZm9ybU9wdGlvbnMiLCJlbmFibGVJbXBsaWNpdENvbnZlcnNpb24iLCJwb3J0IiwicHJvY2VzcyIsImVudiIsIlBPUlQiLCJsaXN0ZW4iLCJsb2ciXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLFdBQVcsUUFBUSxlQUFlO0FBQzNDLFNBQVNDLGNBQWMsRUFBRUMsTUFBTSxRQUFRLGlCQUFpQjtBQUN4RCxTQUFTQyxTQUFTLFFBQVEsa0JBQWtCO0FBRTVDLGVBQWVDO0lBQ2IsTUFBTUMsTUFBTSxNQUFNTCxZQUFZTSxNQUFNLENBQUNIO0lBQ3JDLE1BQU1JLFNBQVMsSUFBSUwsT0FBTztJQUUxQixrQ0FBa0M7SUFDbENHLElBQUlHLFVBQVUsQ0FBQztRQUNiQyxRQUFRO1lBQUM7WUFBeUI7U0FBd0I7UUFDMURDLGFBQWE7SUFDZjtJQUVBLHlCQUF5QjtJQUN6QkwsSUFBSU0sY0FBYyxDQUNoQixJQUFJVixlQUFlO1FBQ2pCVyxXQUFXO1FBQ1hDLFdBQVc7UUFDWEMsc0JBQXNCO1FBQ3RCQyxrQkFBa0I7WUFBRUMsMEJBQTBCO1FBQUs7SUFDckQ7SUFHRixNQUFNQyxPQUFPQyxRQUFRQyxHQUFHLENBQUNDLElBQUksSUFBSTtJQUNqQyxNQUFNZixJQUFJZ0IsTUFBTSxDQUFDSjtJQUNqQlYsT0FBT2UsR0FBRyxDQUFDLENBQUMsMERBQTBELEVBQUVMLEtBQUssUUFBUSxDQUFDO0FBQ3hGO0FBRUFiIn0=