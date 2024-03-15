using Azure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace WebAPI.Models
{
    public class HRDBContext : IdentityDbContext<ApplicationUser>
    {
        public HRDBContext() { }

        public HRDBContext(DbContextOptions options) : base(options) { }

        public virtual DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public virtual DbSet<Attendence> Attendences { get; set; }
        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<DaysOff> OfficialDaysOffs { get; set; }

        public virtual DbSet<OrganizationSettings> OrganizationSettings { get; set; }

        public virtual DbSet<CommissionSettings> CommissionSettings { get; set; }

        public virtual DbSet<DeductionSettings> DeductionSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // composite primary key
            modelBuilder.Entity<Attendence>()
                .HasKey(k => new { k.EmpId, k.Day });

            modelBuilder.Entity<Department>().HasIndex(c => c.Name).IsUnique();

            base.OnModelCreating(modelBuilder);
        }



    }
}
