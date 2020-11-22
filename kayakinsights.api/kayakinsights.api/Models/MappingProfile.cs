using AutoMapper;
using kayakinsights.api.Models.ModelFromFile;
using Data = Hangfire.MemoryStorage.Database.Data;

namespace kayakinsights.api.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Data, BatchModel>();
            CreateMap<FileAccelerometer, Accelerometer>()
                .ForMember(dest => dest.stamp,
                    opt => opt.MapFrom(src => src.TimeStamp))
                .ForMember(dest => dest.x,
                    opt => opt.MapFrom(src => src.RotationX))
                .ForMember(dest => dest.y,
                    opt => opt.MapFrom(src => src.RotationY))
                .ForMember(dest => dest.z,
                    opt => opt.MapFrom(src => src.RotationZ));
            CreateMap<FileGyroscope, Gyroscope>()
                .ForMember(dest => dest.stamp,
                    opt => opt.MapFrom(src => src.TimeStamp))
                .ForMember(dest => dest.x,
                    opt => opt.MapFrom(src => src.AccelerationX))
                .ForMember(dest => dest.y,
                    opt => opt.MapFrom(src => src.AccelerationY))
                .ForMember(dest => dest.z,
                    opt => opt.MapFrom(src => src.AccelerationZ));
        }
    }
}