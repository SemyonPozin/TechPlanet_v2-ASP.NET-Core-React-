using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DataAccessLevel.Repositories;
using Domain.Entities;
using Microsoft.Extensions.DependencyInjection;

namespace techPlanetAPI.Services.Authorization
{
    public class PermissionsHandler : AuthorizationHandler<PermissionRequirement>
    {
        private readonly UsersRepository repository;
        public PermissionsHandler([FromServices]IRepository<User> repo)
        {
            repository = (UsersRepository)repo;
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            Console.WriteLine("Handler");
            int userId = Convert.ToInt32(context.User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value);
            if(userId == 0) 
                return Task.CompletedTask;
            var userPermissions = repository.GetUserPermissions(userId);
            foreach (var item in userPermissions)
            {
                if (requirement.Permissions.Any(p => (int)p == item.Id))
                {
                    context.Succeed(requirement);
                    return Task.CompletedTask;
                }
            }
            return Task.CompletedTask;
        }
    }
}
