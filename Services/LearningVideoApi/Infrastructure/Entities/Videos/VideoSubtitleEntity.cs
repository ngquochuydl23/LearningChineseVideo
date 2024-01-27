using LearningVideoApi.Infrastructure.Seedworks;

namespace LearningVideoApi.Infrastructure.Entities.Videos
{
    public class VideoSubtitleEntity : Entity<long>
    {
        public string VideoId { get; set; }

        public string Url { get; set; }

        public string SrcLang { get; set; } = "zh";

        public bool IsDefault { get; set; }

        public VideoEntity Video { get; set; }


        public VideoSubtitleEntity(string videoId, string url, string srcLang, bool isDefault)
        {
            VideoId = videoId;
            Url = url;
            SrcLang = srcLang;
            IsDefault = isDefault;
        }
    }
}
