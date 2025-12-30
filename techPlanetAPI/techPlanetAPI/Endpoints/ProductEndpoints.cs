using DataAccessLevel.Repositories;
using Domain.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace techPlanetAPI.Endpoints
{
    public static class ProductEndpoints
    {
        public static IEndpointRouteBuilder MapProductEndpoints(this IEndpointRouteBuilder app)
        {
            var products = app.MapGroup("/Products");

            products.MapGet("", Get);
            products.MapGet("/Length", GetLength);
            products.MapGet("{start:int}-{end:int}", GetRange);
            products.MapPost("", Add);

            return app;
        }

        public static async Task<IResult> Get([FromServices] IRepository<Product> repo)//HttpContext context, 
        {
            var list = await repo.GetAllAsync();
            //context.Response.Headers.ContentType = "application/json";
            return Results.Ok(list);
        }
        public static async Task<int> GetLength([FromServices] IRepository<Product> repo)
        {
            var list = await repo.GetAllAsync();
            return list.Count;
        }
        public static async Task<Results<Ok, BadRequest>> Add([FromBody] Product order, [FromServices] IRepository<Product> repo)
        {
            if (await repo.AddAsync(order))
                return TypedResults.Ok();
            else return TypedResults.BadRequest();
        }
        public static async Task<Results<Ok<List<Product>>, NotFound>> GetRange(int start, int end, [FromServices] IRepository<Product> repo)
        {
            var list = await ((ProductsRepository)repo).GetInRange(start, end);
            if(list.Count > 0)
                return TypedResults.Ok(list);
            else return TypedResults.NotFound();
        }
        //public static async Task<Results<Ok, BadRequest>> Update([FromBody] Order order, [FromRoute] int id, [FromServices] IRepository<Order> repo)
        //{
        //    if (await repo.UpdateAsync(id, order))
        //        return TypedResults.Ok();
        //    else return TypedResults.BadRequest();
        //}

        //public static async Task<Results<Ok, BadRequest>> Delete([FromRoute] int id, [FromServices] IRepository<Order> repo)
        //{
        //    if (await repo.DeleteAsync(id))
        //        return TypedResults.Ok();
        //    else return TypedResults.BadRequest();
        //}
    }
}
