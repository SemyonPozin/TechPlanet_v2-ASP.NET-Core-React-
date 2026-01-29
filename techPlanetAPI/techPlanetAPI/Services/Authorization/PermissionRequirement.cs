using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;

namespace techPlanetAPI.Services.Authorization
{
    public class PermissionRequirement(IEnumerable<Permissions> permissions)
        : IAuthorizationRequirement
    {
        public IEnumerable<Permissions> Permissions { get; set; } = permissions;
    }
}
