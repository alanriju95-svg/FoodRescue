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
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { DonationsModule } from './donations/donations.module.js';
import { RequestsModule } from './requests/requests.module.js';
import { PickupsModule } from './pickups/pickups.module.js';
export class AppModule {
}
AppModule = _ts_decorate([
    Module({
        imports: [
            // Load .env variables globally and first, before any other module
            ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env'
            }),
            PrismaModule,
            GraphQLModule.forRoot({
                driver: ApolloDriver,
                autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
                sortSchema: true,
                playground: true,
                introspection: true,
                context: ({ req, res })=>({
                        req,
                        res
                    })
            }),
            AuthModule,
            UsersModule,
            DonationsModule,
            RequestsModule,
            PickupsModule
        ]
    })
], AppModule);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuaW1wb3J0IHsgQ29uZmlnTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb25maWcnO1xyXG5pbXBvcnQgeyBHcmFwaFFMTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9ncmFwaHFsJztcclxuaW1wb3J0IHsgQXBvbGxvRHJpdmVyLCBBcG9sbG9Ecml2ZXJDb25maWcgfSBmcm9tICdAbmVzdGpzL2Fwb2xsbyc7XHJcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgUHJpc21hTW9kdWxlIH0gZnJvbSAnLi9wcmlzbWEvcHJpc21hLm1vZHVsZS5qcyc7XHJcbmltcG9ydCB7IEF1dGhNb2R1bGUgfSBmcm9tICcuL2F1dGgvYXV0aC5tb2R1bGUuanMnO1xyXG5pbXBvcnQgeyBVc2Vyc01vZHVsZSB9IGZyb20gJy4vdXNlcnMvdXNlcnMubW9kdWxlLmpzJztcclxuaW1wb3J0IHsgRG9uYXRpb25zTW9kdWxlIH0gZnJvbSAnLi9kb25hdGlvbnMvZG9uYXRpb25zLm1vZHVsZS5qcyc7XHJcbmltcG9ydCB7IFJlcXVlc3RzTW9kdWxlIH0gZnJvbSAnLi9yZXF1ZXN0cy9yZXF1ZXN0cy5tb2R1bGUuanMnO1xyXG5pbXBvcnQgeyBQaWNrdXBzTW9kdWxlIH0gZnJvbSAnLi9waWNrdXBzL3BpY2t1cHMubW9kdWxlLmpzJztcclxuXHJcbkBNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIC8vIExvYWQgLmVudiB2YXJpYWJsZXMgZ2xvYmFsbHkgYW5kIGZpcnN0LCBiZWZvcmUgYW55IG90aGVyIG1vZHVsZVxyXG4gICAgQ29uZmlnTW9kdWxlLmZvclJvb3Qoe1xyXG4gICAgICBpc0dsb2JhbDogdHJ1ZSxcclxuICAgICAgZW52RmlsZVBhdGg6ICcuZW52JyxcclxuICAgIH0pLFxyXG4gICAgUHJpc21hTW9kdWxlLFxyXG4gICAgR3JhcGhRTE1vZHVsZS5mb3JSb290PEFwb2xsb0RyaXZlckNvbmZpZz4oe1xyXG4gICAgICBkcml2ZXI6IEFwb2xsb0RyaXZlcixcclxuICAgICAgYXV0b1NjaGVtYUZpbGU6IGpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYy9zY2hlbWEuZ3FsJyksXHJcbiAgICAgIHNvcnRTY2hlbWE6IHRydWUsXHJcbiAgICAgIHBsYXlncm91bmQ6IHRydWUsXHJcbiAgICAgIGludHJvc3BlY3Rpb246IHRydWUsXHJcbiAgICAgIGNvbnRleHQ6ICh7IHJlcSwgcmVzIH06IHsgcmVxOiBhbnk7IHJlczogYW55IH0pID0+ICh7IHJlcSwgcmVzIH0pLFxyXG4gICAgfSksXHJcbiAgICBBdXRoTW9kdWxlLFxyXG4gICAgVXNlcnNNb2R1bGUsXHJcbiAgICBEb25hdGlvbnNNb2R1bGUsXHJcbiAgICBSZXF1ZXN0c01vZHVsZSxcclxuICAgIFBpY2t1cHNNb2R1bGUsXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiTW9kdWxlIiwiQ29uZmlnTW9kdWxlIiwiR3JhcGhRTE1vZHVsZSIsIkFwb2xsb0RyaXZlciIsImpvaW4iLCJQcmlzbWFNb2R1bGUiLCJBdXRoTW9kdWxlIiwiVXNlcnNNb2R1bGUiLCJEb25hdGlvbnNNb2R1bGUiLCJSZXF1ZXN0c01vZHVsZSIsIlBpY2t1cHNNb2R1bGUiLCJBcHBNb2R1bGUiLCJpbXBvcnRzIiwiZm9yUm9vdCIsImlzR2xvYmFsIiwiZW52RmlsZVBhdGgiLCJkcml2ZXIiLCJhdXRvU2NoZW1hRmlsZSIsInByb2Nlc3MiLCJjd2QiLCJzb3J0U2NoZW1hIiwicGxheWdyb3VuZCIsImludHJvc3BlY3Rpb24iLCJjb250ZXh0IiwicmVxIiwicmVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsTUFBTSxRQUFRLGlCQUFpQjtBQUN4QyxTQUFTQyxZQUFZLFFBQVEsaUJBQWlCO0FBQzlDLFNBQVNDLGFBQWEsUUFBUSxrQkFBa0I7QUFDaEQsU0FBU0MsWUFBWSxRQUE0QixpQkFBaUI7QUFDbEUsU0FBU0MsSUFBSSxRQUFRLE9BQU87QUFDNUIsU0FBU0MsWUFBWSxRQUFRLDRCQUE0QjtBQUN6RCxTQUFTQyxVQUFVLFFBQVEsd0JBQXdCO0FBQ25ELFNBQVNDLFdBQVcsUUFBUSwwQkFBMEI7QUFDdEQsU0FBU0MsZUFBZSxRQUFRLGtDQUFrQztBQUNsRSxTQUFTQyxjQUFjLFFBQVEsZ0NBQWdDO0FBQy9ELFNBQVNDLGFBQWEsUUFBUSw4QkFBOEI7QUF5QjVELE9BQU8sTUFBTUM7QUFBVzs7O1FBdEJ0QkMsU0FBUztZQUNQLGtFQUFrRTtZQUNsRVgsYUFBYVksT0FBTyxDQUFDO2dCQUNuQkMsVUFBVTtnQkFDVkMsYUFBYTtZQUNmO1lBQ0FWO1lBQ0FILGNBQWNXLE9BQU8sQ0FBcUI7Z0JBQ3hDRyxRQUFRYjtnQkFDUmMsZ0JBQWdCYixLQUFLYyxRQUFRQyxHQUFHLElBQUk7Z0JBQ3BDQyxZQUFZO2dCQUNaQyxZQUFZO2dCQUNaQyxlQUFlO2dCQUNmQyxTQUFTLENBQUMsRUFBRUMsR0FBRyxFQUFFQyxHQUFHLEVBQTBCLEdBQU0sQ0FBQTt3QkFBRUQ7d0JBQUtDO29CQUFJLENBQUE7WUFDakU7WUFDQW5CO1lBQ0FDO1lBQ0FDO1lBQ0FDO1lBQ0FDO1NBQ0QifQ==