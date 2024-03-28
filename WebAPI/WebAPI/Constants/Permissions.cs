namespace WebAPI.Constants
{
    public static class Permissions
    {
        public static List<string> GeneratePermissionsList(string module)
        {
            return new List<string>()
            {
                $"Permissions.{module}.View",
                $"Permissions.{module}.Create",
                $"Permissions.{module}.Edit",
                $"Permissions.{module}.Delete"
            };
        }
        public static List<string> GenerateAllPermission()
        {
            var allPermissions = new List<string>();
            var modules = Enum.GetValues(typeof(Modules));
            foreach(var module in modules)
            
                allPermissions.AddRange(GeneratePermissionsList(module.ToString()));
            return allPermissions;
        }
        public static class Employees
        {
            public const string view = "Permissions.Employees.View";
            public const string create = "Permissions.Employees.Create";
            public const string edit = "Permissions.Employees.Edit";
            public const string delete = "Permissions.Employees.Delete";
        }

        public static class Settings
        {
            public const string view = "Permissions.Settings.View";
            public const string create = "Permissions.Settings.Create";
            public const string edit = "Permissions.Settings.Edit";
            public const string delete = "Permissions.Settings.Delete";
        }

        public static class Attendance
        {
            public const string view = "Permissions.Attendance.View";
            public const string create = "Permissions.Attendance.Create";
            public const string edit = "Permissions.Attendance.Edit";
            public const string delete = "Permissions.Attendance.Delete";
        }

        public static class Salary
        {
            public const string view = "Permissions.Salary.View";
            public const string create = "Permissions.Salary.Create";
            public const string edit = "Permissions.Salary.Edit";
            public const string delete = "Permissions.Salary.Delete";
        }
    }
}
