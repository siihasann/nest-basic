import { Controller, Get, Header, HttpCode, HttpRedirectResponse, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, response } from 'express';
import { Response } from 'express';
import { request } from 'http';
import { title } from 'process';


@Controller('/api/users')
export class UserController {

    @Get('/view/hello')
    viewHello(@Query('name') name: string, @Res() response: Response) {
        response.render('index.html', {
            title: 'Template Engine',
            name: name,
        })
        }

    @Get("/set-cookie")
    setCookie(@Query('name') name: string,@Res() response: Response) {
        response.cookie('name', name);
        response.status(200).send('Success Set Cookie');
    }

    @Get('/get-cookie')
    getCookie(@Req() request: Request):string {
        return request.cookies['name'];
        }

    @Get('/semple-response')
    @Header("Content-Type", "application/json")
    @HttpCode(200)
    sempleREsponse() : Record<string, string> {
        return {
            data: 'Hello JSON'
        };
    }

    @Get('/redirect')
    @Redirect()
    redirect(): HttpRedirectResponse {
        return {
            url: "/api/users/semple-response",
            statusCode: 301,
        }
        }


    // @Get("/hello")
    // sayHello(
    //     @Query("first_name") firstName:string,
    //     @Query("last_name") lastName: string)
    //     : string {
    //     return `hello ${ firstName } ${lastName}`;
        
    // }

    @Get("/hello")
    async sayHello(
        @Query("first_name") firstName:string,
        @Query("last_name") lastName: string)
        : Promise<string> {
        return `hello ${ firstName } ${lastName}`;
        
    }

    // @Get("/:id")
    // getById(@Req() request: Request): string {
    //     return `GET ${ request.params.id }`;
        
    // }

    // Lebih baik pakai @PARAM

    @Get("/:id")
    getById(@Param("id") id:string): string {
        return `GET ${ id }`;
        
    }


    @Post()
    post(): string {
        return 'POST';
    }


    @Get("/sample")
    get(): string {
        return 'Hallo NestJS';
    
    }
}
