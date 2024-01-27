using LearningVideoApi.Infrastructure.Entities.Likes;
using Microsoft.EntityFrameworkCore;

namespace LearningVideoApi.Infrastructure.Entities.Likes
{
    public static class ConfigureEntity
    {
        public static void AddLikeEntities(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LikeEntity>(entity =>
            {
                entity.ToTable("Like");
                entity.HasKey(x => x.Id);
                entity.HasIndex(x => x.UserId);

                entity
                    .HasOne(x => x.Video)
                    .WithMany(video => video.Likes)
                    .HasForeignKey(x => x.VideoId);

                entity
                    .HasOne(x => x.User)
                    .WithMany(user => user.Likes)
                    .HasForeignKey(x => x.UserId);
            });
        }
    }
}
