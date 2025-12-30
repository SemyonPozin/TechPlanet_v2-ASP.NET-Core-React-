using DataAccessLevel.Repositories;
using Domain.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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
            users.MapPost("", Add);
            return app;
        }

        public static async Task<IResult> GetById([FromRoute]int id, [FromServices] IRepository<User> repo)
        {
            var user = await ((UsersRepository)repo).GetByIdAsync(id);
            if (user is null)
                Results.Ok();
            return Results.NotFound();
        }
        public static async Task<Results<Ok, BadRequest>> Add([FromBody] User order, [FromServices] IRepository<User> repo)
        {
            if (await repo.AddAsync(order))
                return TypedResults.Ok();
            else return TypedResults.BadRequest();
        }
        public static async Task<Results<Ok, BadRequest>> Update([FromBody] User user, [FromRoute] int id, [FromServices] IRepository<User> repo)
        {
            if (await repo.UpdateAsync(id, user))
                return TypedResults.Ok();
            else return TypedResults.BadRequest();
        }

        //public static async Task<Results<Ok, BadRequest>> Delete([FromRoute] int id, [FromServices] IRepository<User> repo)
        //{
        //    if (await repo.DeleteAsync(id))
        //        return TypedResults.Ok();
        //    else return TypedResults.BadRequest();
        //}
    }
}
