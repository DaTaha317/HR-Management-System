using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.DTOs;
using WebAPI.Models;



namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ApplicationUserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;
        public ApplicationUserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.roleManager = roleManager;
        }


        [HttpPost("register")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ActionResult> Registration(RegisterDTO account)
        {
            if (ModelState.IsValid)
            {

                var existingUser = await userManager.FindByEmailAsync(account.Email);
                if (existingUser != null)
                {
                    return BadRequest("User with this email already exists");
                }

                ApplicationUser user = new ApplicationUser()
                {
                    FullName = account.FullName,
                    Email = account.Email,
                    PasswordHash = account.Password,
                    UserName = account.Email
                };
                
                IdentityResult result = await userManager.CreateAsync(user, user.PasswordHash);
                if (!await roleManager.RoleExistsAsync(account.RoleName))
                {
                    return NotFound("Role not found");
                }
               
                if (result.Succeeded)
                {
                    //await signInManager.SignInAsync(user, isPersistent: false);
                    await userManager.AddToRoleAsync(user, account.RoleName);

                    return Created();
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }

            return BadRequest(ModelState);

        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginAsync(LoginDTO account)
        {
            if (ModelState.IsValid)
            {
                // check user credentials
                ApplicationUser user = await userManager.FindByEmailAsync(account.Email);
                if (user == null)
                {
                    return Unauthorized();
                }
                bool checkPassword = await userManager.CheckPasswordAsync(user, account.Password);
                if (checkPassword)
                {
                    // Claims
                    List<Claim> claims = new List<Claim>();
                    claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id)); // Add user's ID claim
                    claims.Add(new Claim(ClaimTypes.Name, user.FullName));
                    claims.Add(new Claim(ClaimTypes.Email, user.Email));
                    claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

                    // Get roles
                    var roles = await userManager.GetRolesAsync(user);
                    foreach (var role in roles)
                    {
                        claims.Add(new Claim(ClaimTypes.Role, role));
                    }

                    SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
                    SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                    // Create token
                    JwtSecurityToken token = new JwtSecurityToken(
                        issuer: configuration["JWT:ValidIssuer"], // URL of the Web API
                        audience: configuration["JWT:ValidAudiance"], // URL of the consumer (Angular)
                        claims: claims,
                        expires: DateTime.Now.AddDays(1),
                        signingCredentials: signingCredentials
                    );

                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                        fullName = user.FullName,
                        role = roles[0] // return the first role of the list
                    });
                }
            }
            return Unauthorized();
        }

    }
}
