
using LearningVideoApi.Infrastructure.Entities.Comments;
using LearningVideoApi.Infrastructure.Entities.Likes;
using LearningVideoApi.Infrastructure.Entities.Users;
using LearningVideoApi.Infrastructure.Entities.Videos;
using LearningVideoApi.Infrastructure.Entities.Vocabularies;
using LearningVideoApi.Infrastructure.Entities.WatchedVideos;
using Microsoft.EntityFrameworkCore;

using System.Reflection.Emit;

namespace LearningVideoApi.Infrastructure
{
    public class LearningVideoDbContext : DbContext
    {
        public LearningVideoDbContext(DbContextOptions<LearningVideoDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.AddUserEntities();
            modelBuilder.AddVideoEntities();
            modelBuilder.AddCommentEntities();
            modelBuilder.AddLikeEntities();
            modelBuilder.AddWatchedVideoEntities();
            modelBuilder.AddVocaEntity();
        }
    }
}
