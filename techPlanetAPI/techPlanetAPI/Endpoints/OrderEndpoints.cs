using DataAccessLevel.Repositories;
using Domain.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;

namespace techPlanetAPI.Endpoints
{
    public static class OrderEndpoints
    {
        public static IEndpointRouteBuilder MapOrderEndpoints(this IEndpointRouteBuilder app)
        {
            var orders = app.MapGroup("/Orders");

            orders.MapGet("", Get);
            orders.MapPost("", Add);
            orders.MapPut("/{id:int}", Update);
            orders.MapDelete("/{id:int}", Delete);

            return app;
        }
        public static async Task<IResult> Get(HttpContext context, [FromServices] IRepository<Order> repo)
        {
            var list = await repo.GetAllAsync();
            //context.Response.Headers.ContentType = "application/json";
            return Results.Ok(list);
        }
        public static async Task<Results<Ok, BadRequest>> Add([FromBody] Order order, [FromServices] IRepository<Order> repo)
        {
            if(await repo.AddAsync(order))
                return TypedResults.Ok();
            else return TypedResults.BadRequest();
        }
        public static async Task<Results<Ok, BadRequest>> Update([FromBody] Order order, [FromRoute] int id, [FromServices] IRepository<Order> repo)
        {
            if(await repo.UpdateAsync(id, order))
                return TypedResults.Ok();
            else return TypedResults.BadRequest();
        }

        public static async Task<Results<Ok, BadRequest>> Delete([FromRoute] int id, [FromServices] IRepository<Order> repo)
        {
            if (await repo.DeleteAsync(id))
                return TypedResults.Ok();
            else return TypedResults.BadRequest();
        }

    }
}
