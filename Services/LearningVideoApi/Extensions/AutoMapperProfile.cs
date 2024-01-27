﻿using AutoMapper;
using LearningVideoApi.Dtos.Comment;
using LearningVideoApi.Dtos.MyFavourite;
using LearningVideoApi.Dtos.User;
using LearningVideoApi.Dtos.Video;
using LearningVideoApi.Infrastructure.Entities.Comments;
using LearningVideoApi.Infrastructure.Entities.Likes;
using LearningVideoApi.Infrastructure.Entities.Users;
using LearningVideoApi.Infrastructure.Entities.Videos;

namespace LearningVideoApi.Extensions
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserEntity, UserDto>();
            CreateMap<VideoEntity, VideoDto>()
                 .ForMember(dest => dest.Topics, act => act.MapFrom(src => src.TopicVideos.Select(x => x.Topic.Title)));

            CreateMap<VideoSubtitleEntity, SubtitleDto>();
            CreateMap<CommentEntity, CommentDto>();
            CreateMap<LikeEntity, LikeDto>();
        }
    }
}
