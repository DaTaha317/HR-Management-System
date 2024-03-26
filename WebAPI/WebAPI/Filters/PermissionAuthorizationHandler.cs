using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Filters
{
    public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirements>
    {
        public PermissionAuthorizationHandler()
        {
            
        }
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirements requirement)
        {
            if (context.User == null)
                return;
            var canAccess = context.User.Claims.Any(c => c.Type == "Permission" && c.Value == requirement.Permission && c.Issuer=="LOCAL AUTHORITY");
            if (canAccess)
            {
                context.Succeed(requirement);
                return;
            }
        }
    }
}
