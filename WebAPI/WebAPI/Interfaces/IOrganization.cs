using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IOrganization
    {
        public void Add(OrganizationSettings organization);

        public void Update(OrganizationSettings organization);

        public void Save();
    }
}
