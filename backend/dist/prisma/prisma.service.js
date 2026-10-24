function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}
import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export class PrismaService extends PrismaClient {
    constructor(){
        let dbUrl = process.env.DATABASE_URL;
        // Auto-interpolate DB_PASSWORD if provided
        if (process.env.DB_PASSWORD && process.env.DB_PASSWORD !== 'YOUR_PASSWORD_HERE') {
            if (dbUrl && dbUrl.includes('YOUR_PASSWORD_HERE')) {
                dbUrl = dbUrl.replace('YOUR_PASSWORD_HERE', encodeURIComponent(process.env.DB_PASSWORD));
            } else if (!dbUrl) {
                const user = process.env.DB_USER || 'postgres';
                const host = process.env.DB_HOST || 'localhost';
                const port = process.env.DB_PORT || '5432';
                const db = process.env.DB_NAME || 'foodrescue';
                dbUrl = `postgresql://${user}:${encodeURIComponent(process.env.DB_PASSWORD)}@${host}:${port}/${db}?schema=public`;
            }
        }
        super({
            datasources: dbUrl ? {
                db: {
                    url: dbUrl
                }
            } : undefined
        }), this.logger = new Logger(PrismaService.name);
    }
    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log('✅ Successfully connected to PostgreSQL database.');
        } catch (error) {
            this.logger.warn(`Database notice: PostgreSQL connection waiting for valid credentials in backend/.env (${error?.message ?? error}).`);
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
}
PrismaService = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], PrismaService);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcmlzbWEvcHJpc21hLnNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Nb2R1bGVJbml0LCBPbk1vZHVsZURlc3Ryb3ksIExvZ2dlciB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUHJpc21hU2VydmljZSBleHRlbmRzIFByaXNtYUNsaWVudCBpbXBsZW1lbnRzIE9uTW9kdWxlSW5pdCwgT25Nb2R1bGVEZXN0cm95IHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGxvZ2dlciA9IG5ldyBMb2dnZXIoUHJpc21hU2VydmljZS5uYW1lKTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBsZXQgZGJVcmwgPSBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkw7XHJcblxyXG4gICAgLy8gQXV0by1pbnRlcnBvbGF0ZSBEQl9QQVNTV09SRCBpZiBwcm92aWRlZFxyXG4gICAgaWYgKHByb2Nlc3MuZW52LkRCX1BBU1NXT1JEICYmIHByb2Nlc3MuZW52LkRCX1BBU1NXT1JEICE9PSAnWU9VUl9QQVNTV09SRF9IRVJFJykge1xyXG4gICAgICBpZiAoZGJVcmwgJiYgZGJVcmwuaW5jbHVkZXMoJ1lPVVJfUEFTU1dPUkRfSEVSRScpKSB7XHJcbiAgICAgICAgZGJVcmwgPSBkYlVybC5yZXBsYWNlKCdZT1VSX1BBU1NXT1JEX0hFUkUnLCBlbmNvZGVVUklDb21wb25lbnQocHJvY2Vzcy5lbnYuREJfUEFTU1dPUkQpKTtcclxuICAgICAgfSBlbHNlIGlmICghZGJVcmwpIHtcclxuICAgICAgICBjb25zdCB1c2VyID0gcHJvY2Vzcy5lbnYuREJfVVNFUiB8fCAncG9zdGdyZXMnO1xyXG4gICAgICAgIGNvbnN0IGhvc3QgPSBwcm9jZXNzLmVudi5EQl9IT1NUIHx8ICdsb2NhbGhvc3QnO1xyXG4gICAgICAgIGNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5EQl9QT1JUIHx8ICc1NDMyJztcclxuICAgICAgICBjb25zdCBkYiA9IHByb2Nlc3MuZW52LkRCX05BTUUgfHwgJ2Zvb2RyZXNjdWUnO1xyXG4gICAgICAgIGRiVXJsID0gYHBvc3RncmVzcWw6Ly8ke3VzZXJ9OiR7ZW5jb2RlVVJJQ29tcG9uZW50KHByb2Nlc3MuZW52LkRCX1BBU1NXT1JEKX1AJHtob3N0fToke3BvcnR9LyR7ZGJ9P3NjaGVtYT1wdWJsaWNgO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3VwZXIoe1xyXG4gICAgICBkYXRhc291cmNlczogZGJVcmwgPyB7IGRiOiB7IHVybDogZGJVcmwgfSB9IDogdW5kZWZpbmVkLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvbk1vZHVsZUluaXQoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB0aGlzLiRjb25uZWN0KCk7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmxvZygn4pyFIFN1Y2Nlc3NmdWxseSBjb25uZWN0ZWQgdG8gUG9zdGdyZVNRTCBkYXRhYmFzZS4nKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgdGhpcy5sb2dnZXIud2FybihcclxuICAgICAgICBgRGF0YWJhc2Ugbm90aWNlOiBQb3N0Z3JlU1FMIGNvbm5lY3Rpb24gd2FpdGluZyBmb3IgdmFsaWQgY3JlZGVudGlhbHMgaW4gYmFja2VuZC8uZW52ICgke2Vycm9yPy5tZXNzYWdlID8/IGVycm9yfSkuYFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgb25Nb2R1bGVEZXN0cm95KCkge1xyXG4gICAgYXdhaXQgdGhpcy4kZGlzY29ubmVjdCgpO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkxvZ2dlciIsIlByaXNtYUNsaWVudCIsIlByaXNtYVNlcnZpY2UiLCJkYlVybCIsInByb2Nlc3MiLCJlbnYiLCJEQVRBQkFTRV9VUkwiLCJEQl9QQVNTV09SRCIsImluY2x1ZGVzIiwicmVwbGFjZSIsImVuY29kZVVSSUNvbXBvbmVudCIsInVzZXIiLCJEQl9VU0VSIiwiaG9zdCIsIkRCX0hPU1QiLCJwb3J0IiwiREJfUE9SVCIsImRiIiwiREJfTkFNRSIsImRhdGFzb3VyY2VzIiwidXJsIiwidW5kZWZpbmVkIiwibG9nZ2VyIiwibmFtZSIsIm9uTW9kdWxlSW5pdCIsIiRjb25uZWN0IiwibG9nIiwiZXJyb3IiLCJ3YXJuIiwibWVzc2FnZSIsIm9uTW9kdWxlRGVzdHJveSIsIiRkaXNjb25uZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxVQUFVLEVBQWlDQyxNQUFNLFFBQVEsaUJBQWlCO0FBQ25GLFNBQVNDLFlBQVksUUFBUSxpQkFBaUI7QUFHOUMsT0FBTyxNQUFNQyxzQkFBc0JEO0lBR2pDLGFBQWM7UUFDWixJQUFJRSxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLFlBQVk7UUFFcEMsMkNBQTJDO1FBQzNDLElBQUlGLFFBQVFDLEdBQUcsQ0FBQ0UsV0FBVyxJQUFJSCxRQUFRQyxHQUFHLENBQUNFLFdBQVcsS0FBSyxzQkFBc0I7WUFDL0UsSUFBSUosU0FBU0EsTUFBTUssUUFBUSxDQUFDLHVCQUF1QjtnQkFDakRMLFFBQVFBLE1BQU1NLE9BQU8sQ0FBQyxzQkFBc0JDLG1CQUFtQk4sUUFBUUMsR0FBRyxDQUFDRSxXQUFXO1lBQ3hGLE9BQU8sSUFBSSxDQUFDSixPQUFPO2dCQUNqQixNQUFNUSxPQUFPUCxRQUFRQyxHQUFHLENBQUNPLE9BQU8sSUFBSTtnQkFDcEMsTUFBTUMsT0FBT1QsUUFBUUMsR0FBRyxDQUFDUyxPQUFPLElBQUk7Z0JBQ3BDLE1BQU1DLE9BQU9YLFFBQVFDLEdBQUcsQ0FBQ1csT0FBTyxJQUFJO2dCQUNwQyxNQUFNQyxLQUFLYixRQUFRQyxHQUFHLENBQUNhLE9BQU8sSUFBSTtnQkFDbENmLFFBQVEsQ0FBQyxhQUFhLEVBQUVRLEtBQUssQ0FBQyxFQUFFRCxtQkFBbUJOLFFBQVFDLEdBQUcsQ0FBQ0UsV0FBVyxFQUFFLENBQUMsRUFBRU0sS0FBSyxDQUFDLEVBQUVFLEtBQUssQ0FBQyxFQUFFRSxHQUFHLGNBQWMsQ0FBQztZQUNuSDtRQUNGO1FBRUEsS0FBSyxDQUFDO1lBQ0pFLGFBQWFoQixRQUFRO2dCQUFFYyxJQUFJO29CQUFFRyxLQUFLakI7Z0JBQU07WUFBRSxJQUFJa0I7UUFDaEQsU0FwQmVDLFNBQVMsSUFBSXRCLE9BQU9FLGNBQWNxQixJQUFJO0lBcUJ2RDtJQUVBLE1BQU1DLGVBQWU7UUFDbkIsSUFBSTtZQUNGLE1BQU0sSUFBSSxDQUFDQyxRQUFRO1lBQ25CLElBQUksQ0FBQ0gsTUFBTSxDQUFDSSxHQUFHLENBQUM7UUFDbEIsRUFBRSxPQUFPQyxPQUFZO1lBQ25CLElBQUksQ0FBQ0wsTUFBTSxDQUFDTSxJQUFJLENBQ2QsQ0FBQyxzRkFBc0YsRUFBRUQsT0FBT0UsV0FBV0YsTUFBTSxFQUFFLENBQUM7UUFFeEg7SUFDRjtJQUVBLE1BQU1HLGtCQUFrQjtRQUN0QixNQUFNLElBQUksQ0FBQ0MsV0FBVztJQUN4QjtBQUNGIn0=