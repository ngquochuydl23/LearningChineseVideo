
using LearningVideoApi.Infrastructure.Entities.Comments;
using LearningVideoApi.Infrastructure.Entities.Likes;
using LearningVideoApi.Infrastructure.Entities.Topics;
using LearningVideoApi.Infrastructure.Entities.WatchedVideos;
using LearningVideoApi.Infrastructure.Seedworks;
using NpgsqlTypes;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LearningVideoApi.Infrastructure.Entities.Videos
{
    public class VideoEntity : Entity
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public long ViewerCount { get; set; } = 0;

        public long LikeCount { get; set; } = 0;

        public long CommentCount { get; set; } = 0;

        public string VideoUrl { get; set; }

        public string Thumbnail { get; set; }

        public long Duration { get; set; }

        public string MimeType { get; set; }

        public string Level { get; set; }

        public ICollection<VideoSubtitleEntity> Subtitles { get; set; } = new List<VideoSubtitleEntity>();

        public ICollection<CommentEntity> Comments { get; set; } = new List<CommentEntity>();

        public ICollection<LikeEntity> Likes { get; set; } = new List<LikeEntity>();

        public ICollection<WatchedVideoEntity> WatchedVideos { get; set; } = new List<WatchedVideoEntity>();

        public ICollection<TopicVideoEntity> TopicVideos { get; set; } = new List<TopicVideoEntity>();

        public NpgsqlTsVector SearchVector { get; set; }

        public string? PlainTextWithTopic { get; set; }

        public VideoEntity(
            string title,
            string description,
            string videoUrl,
            string thumbnail,
            string mimeType,
            long duration,
            string level)
        {
            Id = GenerateStringId(title);
            Title = title;
            Description = description;
            VideoUrl = videoUrl;
            Thumbnail = thumbnail;
            MimeType = mimeType;
            Duration = duration;
            Level = level;
        }
    }
}
