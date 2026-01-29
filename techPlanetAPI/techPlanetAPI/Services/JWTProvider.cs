using Domain.Entities;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using techPlanetAPI.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;


namespace techPlanetAPI.Services
{
    public interface IJWTProvider
    {
        public string GenerateToken(User user);
    }
    public class JWTProvider : IJWTProvider
    {
        private readonly JwtOptions options;
        public JWTProvider(IOptions<JwtOptions> options)
        {
            this.options = options.Value;
        }
        public string GenerateToken(User user)
        {
            Claim[] claims = [ new("UserId", user.Id.ToString()), new("role", user.RoleId.ToString())];

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(options.SecretKey)),
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                claims: claims,
                signingCredentials: signingCredentials,
                expires: DateTime.UtcNow.AddHours(options.ExpireHours)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
