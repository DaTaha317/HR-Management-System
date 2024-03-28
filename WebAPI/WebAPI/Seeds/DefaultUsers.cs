using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using WebAPI.Constants;
using WebAPI.Models;

namespace WebAPI.Seeds
{
    public static class DefaultUsers
    {
        public static async Task SeedBasicUserAsync(UserManager<ApplicationUser> userManager)
        {
            var defaultUser = new ApplicationUser()
            {
                FullName = " Admin",
                UserName = "admin@gmail.com",
                Email = "admin@gmail.com",
                EmailConfirmed = false
            };

            var user = await userManager.FindByEmailAsync(defaultUser.Email);
            if (user == null)
            {
                await userManager.CreateAsync(defaultUser, "admin");
                await userManager.AddToRoleAsync(defaultUser, Roles.Admin.ToString());
            }


        }

        public static async Task SeedSuperAdminAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var defaultUser = new ApplicationUser()
            {
                FullName = "Super Admin",
                UserName = "super@gmail.com",
                Email = "super@gmail.com",
                EmailConfirmed = false

            };

            var user = await userManager.FindByEmailAsync(defaultUser.Email);
            if (user == null)
            {
                await userManager.CreateAsync(defaultUser, "super");
                foreach (Roles role in Enum.GetValues(typeof(Roles)))
                {
                    await userManager.AddToRoleAsync(defaultUser, role.ToString());
                }

                //TODO: seed claims
                await roleManager.SeedClaimsForSuperAdmin();
            }


        }
        public static async Task SeedClaimsForSuperAdmin(this RoleManager<IdentityRole> roleManager)
        {
            var superAdmin = await roleManager.FindByNameAsync(Roles.SuperAdmin.ToString());
            foreach(Modules module in Enum.GetValues(typeof(Modules)))
            {
                await roleManager.AddPermissionClaims(superAdmin, module.ToString());
            }
        }

        public static async Task AddPermissionClaims(this RoleManager<IdentityRole> roleManager, IdentityRole role, string module)
        {
            var allClaims = await roleManager.GetClaimsAsync(role);
            var allPermissions = Permissions.GeneratePermissionsList(module);

            foreach (var permission in allPermissions)
            {
                if (!allClaims.Any(c => c.Type == "Permission" && c.Value == permission))
                    await roleManager.AddClaimAsync(role, new Claim("Permission", permission));
            }
        }

    }
}
