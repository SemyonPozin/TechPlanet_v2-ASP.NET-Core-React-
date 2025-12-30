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
            products.MapGet("/Length/filters", GetLengthWithFilters);
            products.MapGet("/{start:int}-{end:int}", GetRange);
            products.MapGet("/{start:int}-{end:int}/filters", GetRangeWithFilters);
            products.MapPost("", Add);

            return app;
        }

        public static async Task<IResult> Get([FromServices] IRepository<Product> repo)//HttpContext context, 
        {
            var list = await repo.GetAllAsync();
            //context.Response.Headers.ContentType = "application/json";
            return Results.Ok(list);
        }

        public static async Task<int> GetLength(
            [FromQuery] string category,
            [FromQuery] string brand,
            [FromQuery] decimal minPrice,
            [FromQuery] decimal maxPrice, 
            [FromServices] IRepository<Product> repo)
        {
            var list = await repo.GetAllAsync();
            List<Product> filteredList = list.Where(p => 
                p.Category == category &&
                p.Brand == brand &&
                p.Price >= minPrice &&
                p.Price <= maxPrice
            ).ToList();

            return filteredList.Count;
        }
        public static async Task<int> GetLengthWithFilters([FromServices] IRepository<Product> repo)
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

        public static async Task<Results<Ok<List<Product>>, NotFound>> GetRangeWithFilters(int start,
            int end,
            [FromQuery] string category,
            [FromQuery] string brand,
            [FromQuery] decimal minPrice,
            [FromQuery] decimal maxPrice,
            [FromQuery] int pageSize,
            [FromQuery] int pageNum,
            [FromServices] IRepository<Product> repo)
        {
            List<Product> list = await ((ProductsRepository)repo).GetAllAsync();
            List<Product> filteredList = list.Where(p => p.Category == category &&
                p.Brand == brand &&
                p.Price >= minPrice &&
                p.Price <= maxPrice
            ).Skip((pageNum - 1) * pageSize)
            .Take(pageSize).ToList();

            if (filteredList.Count > 0)
                return TypedResults.Ok(filteredList);
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
