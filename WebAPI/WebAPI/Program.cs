
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Writers;
using System.Security.Claims;
using System.Text;
using WebAPI.Filters;
using WebAPI.Helpers;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddControllers();
            builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

            builder.Services.AddSingleton<IAuthorizationPolicyProvider, PermissionPolicyProvider>();
            builder.Services.AddScoped<IAuthorizationHandler, PermissionAuthorizationHandler>();


            builder.Services.AddDbContext<HRDBContext>(options =>
                 options.UseLazyLoadingProxies()
                 .UseSqlServer(builder.Configuration.GetConnectionString("cs"))
             );

            builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
                {
                    options.Password.RequiredLength = 4;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireDigit = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                })
                .AddEntityFrameworkStores<HRDBContext>();

            // Add services to the container.
            // to use JWT token to check authentication => [Authorize]
            builder.Services.AddAuthentication(options =>
            {
                // depend on token not on cookie
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                // if token is not valid go to login form
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

            })
            // to not allow any other audiance or issuer to access jwt token
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                // http https
                options.RequireHttpsMetadata = false;
                // same issuer 
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
                    ValidateAudience = true,
                    ValidAudience = builder.Configuration["JWT:ValidAudiance"],

                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"])),
                    RoleClaimType = ClaimTypes.Role
                };
            });


            builder.Services.AddScoped<IDepartmentRepo, DepartmentRepo>();
            builder.Services.AddScoped<IDaysOffRepo, DaysOffRepo>();
            builder.Services.AddScoped<IEmployeeRepo, EmployeeRepo>();
            builder.Services.AddScoped<IAttendence, AttendanceRepo>();
            builder.Services.AddScoped<ICommission, CommissionRepo>();
            builder.Services.AddScoped<IDeduction, DeductionRepo>();
            builder.Services.AddScoped<IWeeklyDaysOff, WeeklyDaysOffRepo>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddSwaggerGen(options =>
            {
                // add JWT Authentication
                var securityScheme = new OpenApiSecurityScheme
                {
                    Name = "JWT Authentication",
                    Description = "Enter JWT Bearer token **_only_**",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer", // must be lower case
                    BearerFormat = "JWT",
                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme
                    }
                };
                options.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {securityScheme, new string[] { }}
                });
            });


            var app = builder.Build();


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;
            //var loggerFactory = services.GetRequiredService<ILoggerFactory>();
            //var logger = loggerFactory.CreateLogger("app");

            try
            {
                var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
                var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

                await Seeds.DefaultRoles.SeedAsync(roleManager);
                await Seeds.DefaultUsers.SeedBasicUserAsync(userManager);
                await Seeds.DefaultUsers.SeedSuperAdminAsync(userManager, roleManager);

                //logger.LogInformation("Data seeded");
                //logger.LogInformation("Application Started");
            }
            catch (System.Exception exception)
            {
                //logger.LogWarning(exception, "An error occured while seeding role");
            }
            app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));


            app.UseHttpsRedirection();

            app.UseAuthentication(); //check jwt token

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
