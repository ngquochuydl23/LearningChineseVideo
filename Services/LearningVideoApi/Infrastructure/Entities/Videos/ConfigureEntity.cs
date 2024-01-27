using LearningVideoApi.Infrastructure.Entities.Videos;
using Microsoft.EntityFrameworkCore;

namespace LearningVideoApi.Infrastructure.Entities.Videos
{
    public static class ConfigureEntity
    {
        public static void AddVideoEntities(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VideoEntity>(entity =>
            {
                entity.ToTable("Video");
                entity.HasKey(x => x.Id);
            });


            modelBuilder.Entity<VideoSubtitleEntity>(entity =>
            {
                entity.ToTable("VideoSubtitle");
                entity.HasKey(x => x.Id);
                
                entity.HasIndex(x => x.VideoId);
                entity
                    .HasOne(x => x.Video)
                    .WithMany(video => video.Subtitles)
                    .HasForeignKey(x => x.VideoId);
            });
        }
    }
}
