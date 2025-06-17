using Microsoft.AspNetCore.Mvc;
using YogaPoseApi.Models;
using YogaPoseApi.Repositories;
using BCrypt.Net;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace YogaPoseApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            var existingUser = await _userRepository.GetUserByUsernameAsync(user.Username);
            if (existingUser != null)
            {
                return BadRequest("Username already exists.");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            await _userRepository.CreateUserAsync(user);
            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(User loginRequest)
        {
            var user = await _userRepository.GetUserByUsernameAsync(loginRequest.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.PasswordHash, user.PasswordHash))
            {
                return Unauthorized("Invalid credentials.");
            }

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        private string GenerateJwtToken(User user)
        {
            var jwtKey = _configuration.GetSection("JwtSettings:Secret").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
