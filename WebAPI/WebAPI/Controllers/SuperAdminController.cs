using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebAPI.Constants;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "SuperAdmin")]
    public class SuperAdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        public SuperAdminController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        [HttpGet("GetUsers")]

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

        [HttpDelete("DeleteUser")]
        public async Task<ActionResult> DeleteUser(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound("User not found");

            var isAdmin = await userManager.IsInRoleAsync(user, Roles.Admin.ToString());
            var isSuper = await userManager.IsInRoleAsync(user, Roles.SuperAdmin.ToString());

            if (isSuper)
                return BadRequest("Not Allowed to delete  SuperAdmin");

            if (isAdmin && User.IsInRole(Roles.Admin.ToString()))
            {
                // Get the builtIn admin with the role
                if (user != null && user.FullName.Trim().ToLower() == "admin")
                {
                    return BadRequest("Not Allowed to delete the built-in Admin user.");
                }
            }

            var result = await userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return NoContent();
        }

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
        [HttpGet("AllRoles")]
        public async Task<ActionResult> GetAllRoles()
        {
            var roles = await roleManager.Roles.ToListAsync();
            return Ok(roles);
        }

        [HttpPost("AddRole")]
        public async Task<ActionResult> Add(RoleFormDTO model)
        {
            if (!ModelState.IsValid)
            {
                return RedirectToAction(nameof(GetAllRoles));
            }
            if (await roleManager.RoleExistsAsync(model.Name))
            {
                ModelState.AddModelError("Error", "Role already Exist");
                return RedirectToAction(nameof(GetAllRoles));
            }
            await roleManager.CreateAsync(new IdentityRole(model.Name.Trim()));
            var role = await roleManager.FindByNameAsync(model.Name.Trim());

            return CreatedAtAction("GetRoleById", role.Id, role);
        }

        [HttpGet("GetRoleById")]
        public async Task<ActionResult> GetRoleById(string roleId)
        {
            var role = await roleManager.FindByIdAsync(roleId);
            if (role == null)
            {
                return NotFound("No role found with this ID");
            }

            return Ok(role);
        }

        [HttpDelete("DeleteRole")]
        public async Task<ActionResult> DeleteRole(string roleName)
        {
            var role = await roleManager.FindByNameAsync(roleName);
            if (role == null)
                return NotFound("Role not found");

            var isAdminRole = role.Name.Equals(Roles.Admin.ToString(), StringComparison.OrdinalIgnoreCase);
            var isSuperRole = role.Name.Equals(Roles.SuperAdmin.ToString(), StringComparison.OrdinalIgnoreCase);
            if (isAdminRole || isSuperRole)
                return BadRequest("Not Allowed to delete Role For Admin or SuperAdmin");
            await roleManager.DeleteAsync(role);
            return NoContent();
        }


        [HttpGet("AllPermessions")]
        public async Task<ActionResult> ManagePermessions(string roleId)
        {
            var role = await roleManager.FindByIdAsync(roleId);
            if (role == null)
                return NotFound("Role Not Found");
            var roleClaims = roleManager.GetClaimsAsync(role).Result.Select(c => c.Value).ToList();
            var allClaims = Permissions.GenerateAllPermission();
            var allPermissions = allClaims.Select(p => new CheckBoxDTO { DisplayValue = p }).ToList();
            foreach (var permission in allPermissions)
            {
                if (roleClaims.Any(c => c == permission.DisplayValue))
                    permission.IsSelected = true;
            }
            var permissionDTO = new PermessionFormDTO
            {
                RoleId = role.Id,
                RoleName = role.Name,
                RoleClaims = allPermissions
            };
            return Ok(permissionDTO);
        }

        [HttpPost("AddPermission")]
        public async Task<ActionResult> AddPermessions(PermessionFormDTO model)
        {
            var role = await roleManager.FindByIdAsync(model.RoleId);
            if (role == null)
                return NotFound("Role Not Found");

            var roleClaims = await roleManager.GetClaimsAsync(role);

            foreach (var roleClaim in roleClaims)
                await roleManager.RemoveClaimAsync(role, roleClaim);

            var selectedClaims = model.RoleClaims.Where(c => c.IsSelected).ToList();

            foreach (var claim in selectedClaims)
                await roleManager.AddClaimAsync(role, new Claim("Permission", claim.DisplayValue));

            return CreatedAtAction("ManagePermessions", role.Id);
        }
    }

}
