using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class OrganizationRepo : IOrganization
    {
        private HRDBContext context;
        public OrganizationRepo(HRDBContext context)
        {
            this.context = context;
        }
        public void Add(OrganizationSettings organization)
        {
            context.OrganizationSettings.Add(organization);
        }

        public OrganizationSettings Get()
        {
            return context.OrganizationSettings.FirstOrDefault();
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public void Update(OrganizationSettings organization)
        {
            context.OrganizationSettings.Update(organization);
        }
    }
}