using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Filters
{
    public class PermissionRequirements:IAuthorizationRequirement
    {
        public string Permission { get; private set; }
        public PermissionRequirements(string permission)
        {
            Permission = permission;
        }
    }
}
