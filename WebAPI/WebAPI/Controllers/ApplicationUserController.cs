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
        public async Task<ActionResult> Registration(RegisterDTO account)
        {
            if (ModelState.IsValid)
            {
                //string hashedPassword = BCrypt.Net.BCrypt.HashPassword(account.Password);

                ApplicationUser user = new ApplicationUser()
                {
                    FullName = account.FullName,
                    Email = account.Email,
                    PasswordHash = account.Password,
                    UserName = account.Email
                };
                IdentityResult result = await userManager.CreateAsync(user, user.PasswordHash);
                if (result.Succeeded)
                {
                    //await signInManager.SignInAsync(user, isPersistent: false);
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
                if(user == null)
                {
                    return Unauthorized();
                }
                bool checkPassword = await userManager.CheckPasswordAsync(user, account.Password);
                if (checkPassword)
                {
                    //claims 
                    List<Claim> claims = new List<Claim>();
                    claims.Add(new Claim(ClaimTypes.Name, user.FullName));
                    claims.Add(new Claim(ClaimTypes.Email, user.Email));
                    claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

                    //get roles
                    var roles = await userManager.GetRolesAsync(user);
                    foreach (var role in roles)
                    {
                        claims.Add(new Claim(ClaimTypes.Role, role));
                    }

                    SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
                    SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                    //create token
                    JwtSecurityToken token = new JwtSecurityToken(
                        issuer: configuration["JWT:ValidIssuer"], //url web api
                        //issuer: "https://localhost:7266/",
                        audience: configuration["JWT:ValidAudiance"], //url consumer angular
                        claims: claims,
                        expires: DateTime.Now.AddDays(1),
                        signingCredentials: signingCredentials
                    );

                    return Ok(new
                    {
                        token= new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo
                    });
                    
                }
            }
            return Unauthorized();
        }

        [HttpGet("GetUsers")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ActionResult> GetUsers()
        {
            var users = await userManager.Users
                .ToListAsync();

            var usersWithRoles = new List<object>();

            foreach (var user in users)
            {
                var roles = await userManager.GetRolesAsync(user);
                usersWithRoles.Add(new { user.Id, user.FullName, user.Email, Roles = roles });
            }

            return Ok(usersWithRoles);
        }


        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("UserRoles")]
        public async Task<ActionResult> ManageRoles(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) 
                NotFound();

            var roles = await roleManager.Roles.ToListAsync();
            var userRoleVM = new UserRolesDTO
            {
                UserId = user.Id,
                UserEmail = user.Email,
                Roles = roles.Select(role => new CheckBoxDTO
                {
                    DisplayValue = role.Name,
                    IsSelected = userManager.IsInRoleAsync(user, role.Name).Result
                }).ToList()
            };

            return Ok(userRoleVM);

        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("UpdateRoles")]
        public async Task<ActionResult> UpdateRoles(UserRolesDTO userRolesDTO)
        {
            var user = await userManager.FindByIdAsync(userRolesDTO.UserId);
            if (user == null)
                return NotFound();

            var userRoles = await userManager.GetRolesAsync(user);

            await userManager.RemoveFromRolesAsync(user, userRoles);
            await userManager.AddToRolesAsync(user, userRolesDTO.Roles.Where(role => role.IsSelected).Select(role => role.DisplayValue));

            return CreatedAtAction("ManageRoles", user.Id, new { user.Email, userRolesDTO.Roles });


        }





    }
}
