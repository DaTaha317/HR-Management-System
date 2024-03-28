using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Filters
{
    public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirements>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public PermissionAuthorizationHandler(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirements requirement)
        {
            if (context.User == null)
                return;

            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return; // User is not authenticated

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return; // User not found

            var userRoles = await _userManager.GetRolesAsync(user);
            if (userRoles == null || !userRoles.Any())
                return; // User has no roles

            // Check each role for permission
            foreach (var roleName in userRoles)
            {
                var role = await _roleManager.FindByNameAsync(roleName);
                if (role == null)
                    continue;

                var roleClaims = await _roleManager.GetClaimsAsync(role);
                if (roleClaims == null || !roleClaims.Any())
                    continue;

                var hasPermission = roleClaims.Any(c => c.Type == "Permission" && c.Value == requirement.Permission);
                if (hasPermission)
                {
                    context.Succeed(requirement);
                    return;
                }
            }
        }
    }
}
