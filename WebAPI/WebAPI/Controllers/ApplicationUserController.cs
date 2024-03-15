using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IConfiguration configuration;
        public ApplicationUserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Registration(RegisterDTO account)
        {
            if (ModelState.IsValid)
            {
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(account.Password);

                ApplicationUser user = new ApplicationUser()
                {
                    FullName = account.FullName,
                    Email = account.Email,
                    PasswordHash = hashedPassword,
                    UserName = account.Email
                };
                IdentityResult result = await userManager.CreateAsync(user);
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
                bool checkPassword = BCrypt.Net.BCrypt.Verify(account.Password, user.PasswordHash);
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

    //    ApplicationUser user = await userManager.FindByEmailAsync(model.Email);

    //    if (user != null && BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
    //    {
    //        // Passwords match
    //        // You can proceed to sign in the user
    //        await signInManager.SignInAsync(user, isPersistent: false);
    //        return Ok("Login successful."); // Return success response
    //}

}
}
