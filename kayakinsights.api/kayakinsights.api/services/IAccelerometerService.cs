using System;
using System.Threading.Tasks;
using kayakinsights.api.Models;

namespace kayakinsights.api.services
{
    public interface IAccelerometerService
    {
        Task<AccelerometerModel> GetById(Guid id);
        Task<AccelerometerModel> AddAccelerometerData(AccelerometerModel model);
    }
}