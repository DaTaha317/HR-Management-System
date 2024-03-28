using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using WebAPI.Models;

namespace WebAPI.Helpers
{
    public class Services
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public Services(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<List<string>> GetRolesForUserAsync(ClaimsPrincipal user)
        {
            var applicationUser = await _userManager.GetUserAsync(user);
            if (applicationUser == null)
            {
                // User not found
                return null;
            }

            var roles = await _userManager.GetRolesAsync(applicationUser);
            return roles.ToList();
        }

        // If you need to get roles by userId
        public async Task<List<string>> GetRolesForUserByIdAsync(string userId)
        {
            var applicationUser = await _userManager.FindByIdAsync(userId);
            if (applicationUser == null)
            {
                // User not found
                return null;
            }

            var roles = await _userManager.GetRolesAsync(applicationUser);
            return roles.ToList();
        }

        // If you need to get roles by userName
        public async Task<List<string>> GetRolesForUserByNameAsync(string userName)
        {
            var applicationUser = await _userManager.FindByNameAsync(userName);
            if (applicationUser == null)
            {
                // User not found
                return null;
            }

            var roles = await _userManager.GetRolesAsync(applicationUser);
            return roles.ToList();
        }
    }
}
