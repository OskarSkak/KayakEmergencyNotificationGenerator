using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using kayakinsights.api.config;
using kayakinsights.api.context;
using kayakinsights.api.Hub;
using kayakinsights.api.repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace kayakinsights.api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            /*
            var config = new ServerConfig();
            Configuration.Bind(config);

            var todoContext = new TodoContext(config.MongoDB);

            var repo = new TodoRepository(todoContext);

            services.AddSingleton<ITodoRepository>(repo);
            */

            services.AddSignalR();
            services.AddScoped<GPSService>();
            services.AddScoped<BatchService>();
            services.AddScoped<GyroscopeService>();
            services.AddScoped<AccelerometerServicecs>();

            services.AddControllers();
            services.AddSwaggerGen(swagger =>
            {
                swagger.SwaggerDoc("v1", new OpenApiInfo { Title = "Kayak Insights" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            
            //app.UseHttpsRedirection();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Kayak Insights v1");
            });
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { 
                endpoints.MapControllers();
                endpoints.MapHub<SignalRHub>("/apiHub");
            });
        }
    }
}