using DataAccessLevel.Repositories;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace techPlanetAPI.Services
{
    public interface IUserService
    {
        public Task Register(string name, string password, string email, string phone, int roleId = 1);
        public Task<string> Login(string email, string password);

    }
    public class UserService : IUserService
    {
        private readonly IPasswordHasher hasher;
        private readonly UsersRepository repository;
        private readonly IJWTProvider jwtProvider;
        public UserService(IPasswordHasher hasher, [FromServices] IRepository<User> repo, IJWTProvider jwtProvider)
        {
            this.hasher = hasher;
            repository = (UsersRepository)repo;
            this.jwtProvider = jwtProvider;
        }
        public async Task Register(string name, string password, string email, string phone, int roleId = 1)
        {
            var existingUser = await repository.GetByEmailAsync(email);
            if (existingUser != null)
                throw new Exception("User already exists");
            string hash = hasher.Generate(password);
            User user = new(name, email, hash, phone, roleId);
            await repository.AddAsync(user); 
        }

        public async Task<string> Login(string email, string password)
        {
            User? user = await repository.GetByEmailAsync(email);
            if (user is null)
                throw new Exception("user not found");

            if(!hasher.Verify(password, user.PasswordHash))
                throw new Exception("wrong password");

            return jwtProvider.GenerateToken(user);
        }
    }
}
