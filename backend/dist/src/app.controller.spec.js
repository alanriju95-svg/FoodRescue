import { Test } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
describe('AppController', ()=>{
    let appController;
    beforeEach(async ()=>{
        const app = await Test.createTestingModule({
            controllers: [
                AppController
            ],
            providers: [
                AppService
            ]
        }).compile();
        appController = app.get(AppController);
    });
    describe('root', ()=>{
        it('should return "Hello World!"', ()=>{
            expect(appController.getHello()).toBe('Hello World!');
        });
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAuY29udHJvbGxlci5zcGVjLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlc3QsIFRlc3RpbmdNb2R1bGUgfSBmcm9tICdAbmVzdGpzL3Rlc3RpbmcnO1xyXG5pbXBvcnQgeyBBcHBDb250cm9sbGVyIH0gZnJvbSAnLi9hcHAuY29udHJvbGxlci5qcyc7XHJcbmltcG9ydCB7IEFwcFNlcnZpY2UgfSBmcm9tICcuL2FwcC5zZXJ2aWNlLmpzJztcclxuXHJcbmRlc2NyaWJlKCdBcHBDb250cm9sbGVyJywgKCkgPT4ge1xyXG4gIGxldCBhcHBDb250cm9sbGVyOiBBcHBDb250cm9sbGVyO1xyXG5cclxuICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGFwcDogVGVzdGluZ01vZHVsZSA9IGF3YWl0IFRlc3QuY3JlYXRlVGVzdGluZ01vZHVsZSh7XHJcbiAgICAgIGNvbnRyb2xsZXJzOiBbQXBwQ29udHJvbGxlcl0sXHJcbiAgICAgIHByb3ZpZGVyczogW0FwcFNlcnZpY2VdLFxyXG4gICAgfSkuY29tcGlsZSgpO1xyXG5cclxuICAgIGFwcENvbnRyb2xsZXIgPSBhcHAuZ2V0PEFwcENvbnRyb2xsZXI+KEFwcENvbnRyb2xsZXIpO1xyXG4gIH0pO1xyXG5cclxuICBkZXNjcmliZSgncm9vdCcsICgpID0+IHtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIFwiSGVsbG8gV29ybGQhXCInLCAoKSA9PiB7XHJcbiAgICAgIGV4cGVjdChhcHBDb250cm9sbGVyLmdldEhlbGxvKCkpLnRvQmUoJ0hlbGxvIFdvcmxkIScpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiVGVzdCIsIkFwcENvbnRyb2xsZXIiLCJBcHBTZXJ2aWNlIiwiZGVzY3JpYmUiLCJhcHBDb250cm9sbGVyIiwiYmVmb3JlRWFjaCIsImFwcCIsImNyZWF0ZVRlc3RpbmdNb2R1bGUiLCJjb250cm9sbGVycyIsInByb3ZpZGVycyIsImNvbXBpbGUiLCJnZXQiLCJpdCIsImV4cGVjdCIsImdldEhlbGxvIiwidG9CZSJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsSUFBSSxRQUF1QixrQkFBa0I7QUFDdEQsU0FBU0MsYUFBYSxRQUFRLHNCQUFzQjtBQUNwRCxTQUFTQyxVQUFVLFFBQVEsbUJBQW1CO0FBRTlDQyxTQUFTLGlCQUFpQjtJQUN4QixJQUFJQztJQUVKQyxXQUFXO1FBQ1QsTUFBTUMsTUFBcUIsTUFBTU4sS0FBS08sbUJBQW1CLENBQUM7WUFDeERDLGFBQWE7Z0JBQUNQO2FBQWM7WUFDNUJRLFdBQVc7Z0JBQUNQO2FBQVc7UUFDekIsR0FBR1EsT0FBTztRQUVWTixnQkFBZ0JFLElBQUlLLEdBQUcsQ0FBZ0JWO0lBQ3pDO0lBRUFFLFNBQVMsUUFBUTtRQUNmUyxHQUFHLGdDQUFnQztZQUNqQ0MsT0FBT1QsY0FBY1UsUUFBUSxJQUFJQyxJQUFJLENBQUM7UUFDeEM7SUFDRjtBQUNGIn0=