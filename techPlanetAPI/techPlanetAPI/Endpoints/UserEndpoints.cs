using DataAccessLevel.Repositories;
using Domain.Entities;
using Domain.Queries;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using techPlanetAPI.Services;

namespace techPlanetAPI.Endpoints
{
    public static class UserEndpoints
    {
        public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
        {
            //app.MapGet("/Register", () => ...);
            //app.MapGet("/Login", () => ...);
            var users = app.MapGroup("Users");

            users.MapGet("{id:int}", GetById);
            users.MapPut("{id:int}", Update);
            users.MapPost("login", Login);
            users.MapPost("register", Register);
            return app;
        }

        public static async Task<IResult> GetById([FromRoute]int id, [FromServices] IRepository<User> repo)
        {
            var user = await ((UsersRepository)repo).GetByIdAsync(id);
            if (user is null)
                Results.Ok();
            return Results.NotFound();
        }
        public static async Task<Results<Ok, BadRequest>> Update([FromBody] User user, [FromRoute] int id, [FromServices] IRepository<User> repo)
        {
            if (await repo.UpdateAsync(id, user))
                return TypedResults.Ok();
            else return TypedResults.BadRequest();
        }

        public static async Task<IResult> Login(IUserService service, LoginUserQuery query, HttpContext context)
        {
            string token = await service.Login(query.Email, query.Password);
            context.Response.Cookies.Append("oreo", token);
            return Results.Ok();
        }

        public static async Task<IResult> Register(IUserService service, RegisterUserQuery query)
        {
            int role = query.RoleId ?? 1;
            await service.Register(query.Name, query.Password, query.Email, query.Phone, role);
            return Results.Ok();
        }

        //public static async Task<Results<Ok, BadRequest>> Delete([FromRoute] int id, [FromServices] IRepository<User> repo)
        //{
        //    if (await repo.DeleteAsync(id))
        //        return TypedResults.Ok();
        //    else return TypedResults.BadRequest();
        //}
    }
}
